import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ShutterCarousel expects an array of "pages".
// Each page is an array of React elements (the blocks).
const ShutterCarousel = ({ pages }) => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    if (!pages || pages.length < 2) return;

    const tl = gsap.timeline({ repeat: -1 });

    // Initial setup: Page 0 is open, all others are closed (scaleY: 0)
    pages.forEach((_, i) => {
      if (i !== 0) {
        gsap.set(`.page-${i}`, { scaleY: 0, transformOrigin: 'center center' });
      } else {
        gsap.set(`.page-${i}`, { scaleY: 1, transformOrigin: 'center center' });
      }
    });

    // Build the infinite loop sequence
    for (let i = 0; i < pages.length; i++) {
      const current = `.page-${i}`;
      const next = `.page-${(i + 1) % pages.length}`;
      
      tl.to({}, { duration: 2.5 }) // Hold the current page visible
        // Close the current page blocks from left to right
        .to(current, { 
          scaleY: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.inOut' 
        })
        // Ensure the next page is on top z-index wise if needed, 
        // but since they are all absolute and we only scale up one at a time, it's fine.
        // Open the next page blocks from left to right
        .to(next, { 
          scaleY: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.inOut' 
        });
    }

  }, { scope: containerRef, dependencies: [pages] });

  return (
    <div 
      className="shutter-container" 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000', // Black screen
      }}
    >
      {pages.map((pageBlocks, pageIndex) => (
        <div 
          key={pageIndex} 
          className="shutter-page-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'row',
            padding: '2rem',
            gap: '1rem',
            boxSizing: 'border-box'
          }}
        >
          {pageBlocks.map((block, blockIndex) => (
            <div 
              key={blockIndex} 
              className={`shutter-block page-${pageIndex}`}
              style={{
                flex: 1,
                height: '100%',
                overflow: 'hidden',
                borderRadius: '24px',
                position: 'relative',
                willChange: 'transform'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, minWidth: '200px' }}>
                {block}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShutterCarousel;
