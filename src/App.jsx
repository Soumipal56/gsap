import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'motion/react'

const App = () => {
  
  const boxVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }
  }

  return (
    <div>
      <motion.div variants={boxVariant} initial="hidden" transition={{ duration: 0.5, ease: 'easeInOut' }} animate="visible" whileInView={{opacity: 1, scale: 1}} className="box"></motion.div>
      <motion.div variants={boxVariant} initial="hidden" transition={{ duration: 0.5, ease: 'easeInOut' }} animate="visible" whileInView={{opacity: 1, scale: 1}} className="box"></motion.div>
      <motion.div variants={boxVariant} initial="hidden" transition={{ duration: 0.5, ease: 'easeInOut' }} animate="visible" whileInView={{opacity: 1, scale: 1}} className="box"></motion.div>
      <motion.div variants={boxVariant} initial="hidden" transition={{ duration: 0.5, ease: 'easeInOut' }} animate="visible" whileInView={{opacity: 1, scale: 1}} className="box"></motion.div>
      
    </div>
  )
}

export default App