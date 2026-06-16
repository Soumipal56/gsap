import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const App = () => {
  const boxRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(()=>{
    gsap.to(boxRef.current,{
      x: 700,
      duration: 1,
      delay: 0.5,
    })
  },{ scope: containerRef.current, dependencies: [], revertOnUpdate: true })
  
  return (
    <div ref={containerRef}>
      <div ref={boxRef} className='box'>

      </div>
    </div>
  )
}

export default App