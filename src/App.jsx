import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./index.css";

const SplitWords = ({ text, className }) => {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split(" ").map((word, i) => (
        <span 
          key={i} 
          className={className} 
          style={{ 
            display: "inline-block", 
            marginRight: "0.25em",
            willChange: "transform, opacity"
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

const App = () => {
  const containerRef = useRef(null);
  const coverRef = useRef(null);
  const letterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const imgUrl = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Initial load animation for the card
  useGSAP(() => {
    gsap.from(coverRef.current, {
      y: -100,
      opacity: 0,
      rotation: -5,
      duration: 1.5,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  const handleOpen = contextSafe(() => {
    if (isOpen) return;
    setIsOpen(true);
    
    const tl = gsap.timeline();

    // 1. Ensure the cover becomes a full rectangle first
    tl.to(coverRef.current, {
      clipPath: "polygon(0% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.4,
      ease: "power2.out"
    });

    // 2. Wait for a short delay (0.4s), then slide the cover away to the top
    tl.to(coverRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut"
    }, "+=0.4");

    // 3. Animate the letter container popping up
    tl.fromTo(letterRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" },
      "<0.4" // Start 0.4 seconds after the cover starts sliding away
    );

    // Pre-hide the text elements so they don't flash before animating
    tl.set(['.line-1-word', '.line-2', '.line-3-word'], { y: 20, opacity: 0 }, "<");

    // 4. Animate Line 1 (Header words)
    tl.to('.line-1-word',
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.2" // Overlap slightly with the letter container popping up
    );

    // 5. Animate Line 2 (Body paragraph sentences) after Line 1 COMPLETELY finishes
    tl.to('.line-2',
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.3, ease: "power2.out" },
      ">" // The '>' position parameter means "start exactly at the end of the previous animation"
    );

    // 6. Animate Line 3 (Footer words) after Line 2 COMPLETELY finishes
    tl.to('.line-3-word',
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      ">" // Wait for Line 2 to finish
    );
  });

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0ece1", overflow: "hidden" }}>
      
      {/* The Wrapper for the Card */}
      <div style={{ position: "relative", width: "90%", maxWidth: "600px", height: "400px" }}>
        
        {/* The Letter (Underneath) */}
        <div 
          ref={letterRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #FFE259 0%, #FFA751 100%)",
            padding: "3rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: 0, // Hidden initially, revealed by GSAP
            visibility: isOpen ? "visible" : "hidden" // Ensure it's not clickable before open
          }}
        >
          <h2 style={{ fontFamily: "serif", fontSize: "2.5rem", marginBottom: "1rem", color: "#D84315", textShadow: "1px 1px 2px rgba(255,255,255,0.4)" }}>
            <SplitWords text="Dearest Friend, 💌" className="line-1-word" />
          </h2>
          <div style={{ fontFamily: "serif", fontSize: "1.3rem", lineHeight: 1.6, color: "#4E342E", fontWeight: "500", marginBottom: "1rem" }}>
            <div className="line-2" style={{ willChange: "transform, opacity" }}>I wanted to take a moment to write to you.</div>
            <div className="line-2" style={{ willChange: "transform, opacity" }}>This card holds my truest feelings. ✨</div>
            <div className="line-2" style={{ willChange: "transform, opacity" }}>Thank you for being such an important part of my life. 💖</div>
            <div className="line-2" style={{ willChange: "transform, opacity" }}>May this interactive card bring a smile to your face. 😊</div>
          </div>
          <p style={{ fontFamily: "serif", fontSize: "1.4rem", marginTop: "2rem", color: "#C62828", fontStyle: "italic", fontWeight: "bold" }}>
            <SplitWords text="With colorful love, 🌹" className="line-3-word" />
            <br/>
            <SplitWords text="Your Secret Admirer 🤫" className="line-3-word" />
          </p>
        </div>

        {/* The Card Cover (On Top) */}
        <div 
          ref={coverRef}
          onClick={handleOpen}
          style={{ 
            position: "absolute",
            inset: 0,
            cursor: isOpen ? "default" : "pointer",
            clipPath: "polygon(0% 50%, 40% 0%, 100% 0%, 100% 100%, 40% 100%)",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "3rem",
            pointerEvents: isOpen ? "none" : "auto"
          }}
        >
          {/* Subtle text inviting the user to click */}
          <div style={{ color: "white", fontSize: "2rem", fontWeight: "900", letterSpacing: "0.1em", textShadow: "0 4px 10px rgba(0,0,0,0.6)" }}>
            💌 OPEN ME
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
