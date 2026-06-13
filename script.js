// Register plugins (assuming global usage from CDNs, but will also work if imported)
if (typeof Draggable !== "undefined") gsap.registerPlugin(Draggable);
if (typeof InertiaPlugin !== "undefined") gsap.registerPlugin(InertiaPlugin);

Draggable.create(".lamp-head", {
  type: "y",
  bounds: { minY: 0, maxY: 60 }, // allow dragging down up to 60px
  inertia: true,
  snap: {
    y: [0] // snap back to original position (y: 0) when released
  },
  onDrag: function() {
    // stretch the wire as we drag the lamp head down
    gsap.set(".lamp-wire", { height: 60 + this.y });
  },
  onThrowUpdate: function() {
    // continue stretching the wire as inertia snaps it back
    gsap.set(".lamp-wire", { height: 60 + this.y });
  },
  onRelease: function() {
    // when released, if pulled down more than 30px, toggle the light
    if (this.y > 30) {
      document.getElementById("lampContainer").classList.toggle("on");
    }
  }
});

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