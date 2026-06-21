import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Renders text split into individual character spans
 * and animates them in with a stagger when mounted.
 */
const SplitText = ({ text, style = {} }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const chars = containerRef.current.querySelectorAll('.split-char');

    gsap.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.4,
      }
    );
  }, { scope: containerRef });

  return (
    <span
      ref={containerRef}
      style={{
        display: 'inline-block',
        perspective: '600px',
        overflow: 'visible',
        ...style
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformOrigin: 'top center',
            willChange: 'transform, opacity'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
