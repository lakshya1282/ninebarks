const { exec } = require('child_process');
const fs = require('fs');

async function run() {
  const chromeProc = exec('"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --remote-debugging-port=9224 --disable-gpu --window-size=1440,900 http://localhost:5174/');
  
  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const listRes = await fetch('http://localhost:9224/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5174'));
    if (!pageTab) return;
    
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve) => {
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
      await send('Runtime.enable');
      await send('Page.enable');

      // Scroll to ChalkingWall
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1000)' });
      await new Promise(r => setTimeout(r, 1000));
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scroll_1000.png', Buffer.from(shot.data, 'base64'));

      // Scroll further to ElevationAuditSection
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3000)' });
      await new Promise(r => setTimeout(r, 1000));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scroll_3000.png', Buffer.from(shot.data, 'base64'));

      // Scroll to Reviews & Contact
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 6000)' });
      await new Promise(r => setTimeout(r, 1000));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scroll_6000.png', Buffer.from(shot.data, 'base64'));

      ws.close();
      chromeProc.kill();
      process.exit(0);
    };
  } catch(e) {
    console.error(e);
    chromeProc.kill();
    process.exit(1);
  }
}
run();
