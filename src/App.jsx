import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'motion/react'

const App = () => {
 
  return (
    <div>
      <motion.div initial={{ opacity: 0}} transition={{ duration: 0.5, ease: 'easeInOut' }} animate={{ x: 500, opacity: 1 }} whileInView={{opacity: 1, scale: 1}} className="box"></motion.div>
    </div>
  )
}

export default App