// Register plugins
if (typeof Draggable !== "undefined") gsap.registerPlugin(Draggable);
if (typeof InertiaPlugin !== "undefined") gsap.registerPlugin(InertiaPlugin);

const kettle = document.querySelector(".kettle");
let isPoured = false;

kettle.addEventListener("click", function onClick() {
  // Remove listener so we only do this once
  kettle.removeEventListener("click", onClick);

  // Stop the steam from the kettle while pouring
  gsap.to(".spout-steam", { opacity: 0, duration: 0.5 });

  // Move the kettle up and slightly right so the spout is over the glass
  gsap.to(kettle, {
    y: -60,
    x: 60,
    duration: 1.2,
    ease: "power2.out",
    onComplete: () => {
      // Create a hidden proxy to map vertical dragging to rotation
      const proxy = document.createElement("div");
      proxy.style.position = "absolute";
      proxy.style.visibility = "hidden";
      proxy.id = "kettle-proxy";
      document.body.appendChild(proxy);

      Draggable.create(proxy, {
        type: "y",
        trigger: kettle, // User interacts with the kettle
        bounds: { minY: 0, maxY: 90 }, // Drag down up to 90px
        inertia: true,
        onDrag: function () {
          // Use ease to make the heavy kettle rotate smoothly
          gsap.to(kettle, {
            rotation: this.y,
            duration: 0.2,
            ease: "power2.out",
          });
          handlePour(this.y);
        },
        onThrowUpdate: function () {
          gsap.to(kettle, {
            rotation: this.y,
            duration: 0.2,
            ease: "power2.out",
          });
          handlePour(this.y);
        },
      });
    },
  });
});

function handlePour(rot) {
  // Counter-rotate the stream so it always points straight down to the table
  gsap.set(".tea-pour-stream", { rotation: -rot });

  // Trigger pouring if tilted past 30 degrees
  if (rot > 30 && !isPoured) {
    isPoured = true; // Ensure it only fills once

    const pourTl = gsap.timeline();

    // 1. Shoot the stream down
    pourTl
      .to(".tea-pour-stream", {
        height: 80, // Distance to the bottom of the glass
        duration: 0.4,
        ease: "power1.in",
      })
      // 2. Fill the glass and show the steam
      .to(
        ".tea-liquid",
        {
          height: "80%",
          opacity: 1,
          duration: 2,
          ease: "power1.inOut",
        },
        "-=0.1",
      )
      .to(
        ".tea-steam",
        {
          opacity: 1,
          duration: 1,
        },
        "-=1.5",
      )
      // 3. Retract stream and return kettle to original position
      .to(".tea-pour-stream", {
        opacity: 0,
        duration: 0.2,
      })
      .to(kettle, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onStart: () => {
          const d = Draggable.get("#kettle-proxy");
          if (d) d.disable();
        },
      })
      .to(".spout-steam", {
        opacity: 1,
        duration: 0.5,
      });
  }
}

function simulateLoading() {
  const loaderText = document.querySelector("#loader h2");
  const loadState = { progress: 0 };

  gsap.to(loadState, {
    progress: 100,
    duration: 2,
    ease: "power2.inOut",
    roundProps: "progress",
    onUpdate: () => {
      loaderText.innerHTML = `${loadState.progress}%`;
      document.querySelector(".progress-bar").style.width =
        `${loadState.progress}%`;
    },
    onComplete: () => {
      // Fade out loader
      gsap.to("#loader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.getElementById("loader").style.display = "none";
        },
      });

      // Animate Chai Tapri title characters
      gsap.to(".chai-title .char", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });

      // Animate hero title elements with stagger
      gsap.from(".hero-title h2, .hero-title p", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        delay: 0.5,
      });
    },
  });
}

simulateLoading();

// Animate each letter span inside .letter-container
// gsap.from('.letter-container span', {
//   x: 1000,
//   duration: 2,
//   delay: 1,
//   ease: 'bounce.out',
//   stagger:
//     each: 0.3,
//     from: 'center'
//   }
// });

// const play = document.querySelector('.play')
// const pause = document.querySelector('.pause')
// const restart = document.querySelector('.restart')
// const reverse = document.querySelector('.reverse')
// const seek = document.querySelector('.seek')

// const tl = gsap.timeline({
//   paused: true
// })

// tl.to("#box1",{
//   x: () => window.innerWidth - 250,
//   rotate:360,
//   duration:1.5,
//   delay:1
// }).addLabel("soumi")

// tl.to("#box2",{
//   x: () => window.innerWidth - 250,
//   duration:1.5
// })

// tl.to("#box3",{
//   x: () => window.innerWidth - 250,
//   duration:1.5
// })

// play.addEventListener("click", () => {
//   tl.play();
// })

// pause.addEventListener("click", () => {
//   tl.pause();
// })

// restart.addEventListener("click", () => {
//   tl.restart();
// })

// reverse.addEventListener("click", () => {
//   tl.reverse();
// })

// seek.addEventListener("click", () => {
//   tl.seek("soumi")
// })

// Loading Timeline
// const loadingTimeline = () => {
//   return gsap.timeline().to(Element,{}).from
// }

// Navbar Timeline
// const navbarTimeline = () => {
//   return gsap.timeline()
// }

// const master = gsap.timeline();

// master.add(loadingTimeline).add(navbarTimeline);
