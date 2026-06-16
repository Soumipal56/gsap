import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'motion/react'

const App = () => {
 
  return (
    <div>
      <motion.div transition={{ duration: 0.8, delay: 0.6 }} animate={{ x: 500 }} className="box"></motion.div>
    </div>
  )
}

export default App