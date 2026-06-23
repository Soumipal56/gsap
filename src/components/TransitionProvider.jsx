import React, { createContext, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TransitionContext = createContext(null);

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const shutterRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // We'll use 5 blocks for the shutter effect.
  const blocks = [0, 1, 2, 3, 4];

  const navigateWithTransition = (to, imgUrl) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const blockElements = shutterRef.current.children;

    // Apply the image to the blocks
    if (imgUrl) {
      gsap.set(blockElements, { backgroundImage: `url(${imgUrl})` });
    } else {
      gsap.set(blockElements, { backgroundImage: 'none', backgroundColor: '#000000' });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    // Ensure shutter container is visible
    gsap.set(shutterRef.current, { display: 'flex' });

    // Step 1: Blocks scale up to cover the screen (close shutter)
    tl.fromTo(blockElements, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power3.inOut' 
      }
    )
    // Step 2: Actually change the route while screen is covered by shutter
    .call(() => {
      navigate(to);
    })
    // Brief pause
    .to({}, { duration: 0.3 })
    // Step 3: Blocks scale down to reveal the new page (open shutter)
    .to(blockElements, { 
        scaleY: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power3.inOut' 
    })
    // Cleanup: hide shutter container
    .set(shutterRef.current, { display: 'none' });
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* The Global Shutter Overlay */}
      <div 
        ref={shutterRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999, // On top of everything
          display: 'none', // Hidden initially
          flexDirection: 'row',
          pointerEvents: 'none', // Don't block clicks
          gap: '0px', // Removing gap to make the image seamless
          backgroundColor: 'transparent'
        }}
      >
        {blocks.map(i => (
          <div 
            key={i}
            className="shutter-block"
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000',
              backgroundImage: 'none',
              backgroundSize: '500% 100%',
              backgroundPosition: `${i * 25}% center`,
              backgroundRepeat: 'no-repeat',
              transformOrigin: 'center center', // Shrink/grow from center
              willChange: 'transform'
            }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
};
