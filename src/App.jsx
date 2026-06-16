import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimateonX from './components/AnimateonX'

const App = () => {
  const boxRef = useRef([])
  const containerRef = useRef(null)

  const addToRefs = (el) => {
    if (el && !boxRef.current.includes(el)) {
      boxRef.current.push(el)
    }
  }

  const {contextSafe} = useGSAP(()=>{
    gsap.to(boxRef.current,{
      x: 700,
      duration: 1,
      delay: 0.5,
      stagger: 0.2
    })
  },{ scope: containerRef.current, dependencies: [], revertOnUpdate: true })
  
  return (
    <div ref={containerRef}>
      <div ref={addToRefs} className='box'></div>
      <div ref={addToRefs} className='box'></div>
      <div ref={addToRefs} className='box'></div>
      <AnimateonX><div className='box'></div></AnimateonX>
    </div>
  )
}

export default App