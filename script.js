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

var tl = gsap.timeline()

tl.to("#box1",{
  x:1500,
  rotate:360,
  duration:1.5,
  delay:1
})

tl.to("#box2",{
  x:1500,
  duration:1.5
})