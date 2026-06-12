// Animate each letter span inside .letter-container
// gsap.from('.letter-container span', {
//   x: 1000,
//   duration: 2,
//   delay: 1,
//   ease: 'bounce.out',
//   stagger: {
//     each: 0.3,
//     from: 'center'
//   }
// });

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const restart = document.querySelector('.restart')
const reverse = document.querySelector('.reverse')

const tl = gsap.timeline({
  paused: true
})

tl.to("#box1",{
  x: () => window.innerWidth - 250,
  rotate:360,
  duration:1.5,
  delay:1
})

tl.to("#box2",{
  x: () => window.innerWidth - 250,
  duration:1.5
})

tl.to("#box3",{
  x: () => window.innerWidth - 250,
  duration:1.5
})

play.addEventListener("click", () => {
  tl.play();
})

pause.addEventListener("click", () => {
  tl.pause();
})

restart.addEventListener("click", () => {
  tl.restart();
})

reverse.addEventListener("click", () => {
  tl.reverse();
})

