import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  speed = 10,
  scale = 1.2,
  children,
  ...props
}) {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!parallaxRef.current || !containerRef.current) return;
      
      gsap.fromTo(
        parallaxRef.current,
        { 
          yPercent: speed, 
          scale: scale 
        },
        {
          yPercent: -speed,
          scale: scale,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`} {...props}>
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full origin-center">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </div>
      {children}
    </div>
  );
}
