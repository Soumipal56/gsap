import { useGSAP } from '@gsap/react'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const AnimateonX = ({children}) => {
  const containerRef = useRef(null)  
  useGSAP(()=>{
    gsap.to(containerRef.current,{
      x: 700,
      duration: 1,
      delay: 0.5,
    })
  })  

  useEffect(()=>{
    if (children && children.props) {
      console.log(children.props)
    }
  }, [children])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

export default AnimateonX