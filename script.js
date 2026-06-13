gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 1200,
  ease: "power4.out",
  scrollTrigger: {
    trigger: '.box',
    start: 'top 30%',
    end: "top 10%",
    scrub: true,
  }
})

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