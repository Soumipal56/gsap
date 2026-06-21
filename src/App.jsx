import React from "react";
import "./index.css";
import ShutterCarousel from "./components/ShutterCarousel";

const ImageSlide = ({ url, title }) => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <img 
      src={url} 
      alt={title} 
      style={{ 
        width: "100%", 
        height: "100%", 
        objectFit: "cover", 
        opacity: 0.7 
      }} 
    />
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ 
        fontSize: "4vw", 
        fontWeight: "900", 
        letterSpacing: "0.2em", 
        color: "white", 
        mixBlendMode: "overlay",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)"
      }}>
        {title}
      </h1>
    </div>
  </div>
);

const App = () => {
  // We define groups of blocks to represent "pages"
  const page1 = [
    <ImageSlide key="1" url="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" title="INNOVATION" />,
    <ImageSlide key="2" url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" title="CLARITY" />,
    <ImageSlide key="3" url="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2000&auto=format&fit=crop" title="FOCUS" />,
    <ImageSlide key="4" url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" title="CODE" />,
    <ImageSlide key="5" url="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" title="CIRCUIT" />,
  ];

  const page2 = [
    <ImageSlide key="6" url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" title="MATRIX" />,
    <ImageSlide key="7" url="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2000&auto=format&fit=crop" title="NATURE" />,
    <ImageSlide key="8" url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" title="SPACE" />,
    <ImageSlide key="9" url="https://images.unsplash.com/photo-1531297172867-11e7ef161eb3?q=80&w=2070&auto=format&fit=crop" title="FUTURE" />,
    <ImageSlide key="10" url="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" title="ROBOTIC" />,
  ];

  const page3 = [
    <ImageSlide key="11" url="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop" title="MOUNTAINS" />,
    <ImageSlide key="12" url="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" title="WAVES" />,
    <ImageSlide key="13" url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" title="OCEAN" />,
    <ImageSlide key="14" url="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" title="PEAKS" />,
    <ImageSlide key="15" url="https://images.unsplash.com/photo-1444464666168-49b626d49c88?q=80&w=2067&auto=format&fit=crop" title="BIRD" />,
  ];

  return <ShutterCarousel pages={[page1, page2, page3]} />;
};

export default App;
