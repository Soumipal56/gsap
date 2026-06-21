import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransitionProvider, useTransition } from "./components/TransitionProvider";
import SplitText from "./components/SplitText";
import AnimatedButton from "./components/AnimatedButton";
import "./index.css";

// A reusable template for our dummy pages
const PageTemplate = ({ title, bgUrl, nextRoute, prevRoute }) => {
  const { navigateWithTransition } = useTransition();

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img 
        src={bgUrl} 
        alt={title} 
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} 
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
        <h1 style={{ fontSize: "6rem", fontWeight: "900", letterSpacing: "0.2em", color: "white", overflow: "hidden", lineHeight: 1.1 }}>
          <SplitText text={title} />
        </h1>
        <div style={{ display: "flex", gap: "1.2rem", marginTop: "1rem" }}>
          {prevRoute && (
            <AnimatedButton onClick={() => navigateWithTransition(prevRoute)} delay={0.6}>
              ← Prev Page
            </AnimatedButton>
          )}
          {nextRoute && (
            <AnimatedButton onClick={() => navigateWithTransition(nextRoute)} delay={0.7}>
              Next Page →
            </AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => (
  <PageTemplate 
    title="HOME" 
    bgUrl="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
    nextRoute="/about"
  />
);

const About = () => (
  <PageTemplate 
    title="ABOUT" 
    bgUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    prevRoute="/"
    nextRoute="/contact"
  />
);

const Contact = () => (
  <PageTemplate 
    title="CONTACT" 
    bgUrl="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2000&auto=format&fit=crop"
    prevRoute="/about"
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
};

export default App;
