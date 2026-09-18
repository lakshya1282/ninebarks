const { exec } = require('child_process');
const fs = require('fs');

async function run() {
  const chromeProc = exec('"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --remote-debugging-port=9223 --disable-gpu http://localhost:5173/');
  
  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const listRes = await fetch('http://localhost:9223/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5173'));
    if (!pageTab) {
      console.log('No page tab found');
      return;
    }
    
    console.log('Connecting to:', pageTab.webSocketDebuggerUrl);
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    
    let id = 1;
    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve, reject) => {
        const handler = (event) => {
          const raw = typeof event.data === 'string' ? event.data : event.data.toString();
          const msg = JSON.parse(raw);
          if (msg.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    ws.onopen = async () => {
      console.log('WebSocket open!');
      ws.addEventListener('message', (event) => {
        const raw = typeof event.data === 'string' ? event.data : event.data.toString();
        const data = JSON.parse(raw);
        if (data.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description).join(' '));
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails);
        }
      });

      await send('Runtime.enable');
      await send('Console.enable');
      await send('Page.enable');

      // Wait 3 seconds to let Hero timeline run
      await new Promise(r => setTimeout(r, 3000));

      // Capture screenshot
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('debug_screenshot.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved debug_screenshot.png');

      // Check styles of elements
      const evalRes = await send('Runtime.evaluate', {
        expression: `({
          videoClip: getComputedStyle(document.querySelector('video')?.parentElement).clipPath,
          title1Clip: getComputedStyle(document.querySelector('h1')).clipPath,
          title1Opacity: getComputedStyle(document.querySelector('h1')).opacity,
          navOpacity: getComputedStyle(document.querySelector('header')?.parentElement || document.querySelector('nav')?.parentElement).opacity,
          errors: window.__errors || []
        })`,
        returnByValue: true
      });
      console.log('Computed styles in browser:', evalRes.result.value);

      ws.close();
      chromeProc.kill();
      process.exit(0);
    };

  } catch(err) {
    console.error(err);
    chromeProc.kill();
    process.exit(1);
  }
}

run();
