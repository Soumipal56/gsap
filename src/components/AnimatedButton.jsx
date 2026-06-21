import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * A 2D animated button demonstrating all four core GSAP methods:
 *
 * 1. gsap.from()      — entrance: slides & fades in from below on mount
 * 2. gsap.to()        — hover-in: scales up + shifts background
 * 3. gsap.fromTo()    — hover-out: explicitly resets from current to idle state
 * 4. gsap.timeline()  — click: chained press → bounce → settle sequence
 */
const AnimatedButton = ({ children, onClick, delay = 0 }) => {
  const btnRef = useRef(null);
  const isAnimating = useRef(false); // guard against double-click

  useGSAP(() => {
    // 1. gsap.from() — Entrance animation: slide up + fade in from below
    gsap.from(btnRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
    });
  });

  // 2. gsap.to() — Hover IN: scale up, lift with a shadow bump
  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.08,
      y: -4,
      backgroundColor: '#111111',
      color: '#ffffff',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // 3. gsap.fromTo() — Hover OUT: explicitly snap from current → idle state
  const handleMouseLeave = () => {
    gsap.fromTo(
      btnRef.current,
      // "from" — wherever it currently is
      { scale: 1.08, y: -4, backgroundColor: '#111111', color: '#ffffff' },
      // "to" — back to the original idle look
      { scale: 1, y: 0, backgroundColor: '#ffffff', color: '#000000', duration: 0.4, ease: 'power3.out' }
    );
  };

  // 4. gsap.timeline() — Click: press down → bounce up → settle
  const handleClick = () => {
    // Prevent firing while the animation or navigation is already running
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Disable pointer events so the button can't be clicked again mid-animation
    btnRef.current.style.pointerEvents = 'none';

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onClick?.();
      }
    });

    tl.to(btnRef.current, {
      scale: 0.92,
      y: 2,
      duration: 0.1,
      ease: 'power2.in',
    })
    .to(btnRef.current, {
      scale: 1.1,
      y: -6,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(btnRef.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        background: '#ffffff',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '800',
        letterSpacing: '0.08em',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        willChange: 'transform, background-color',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
