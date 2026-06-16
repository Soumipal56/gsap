import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'motion/react'

const App = () => {
 
  return (
    <div>
      <motion.div initial={{ opacity: 0}} transition={{ duration: 0.5, ease: 'easeInOut' }} animate={{ x: 500, opacity: 1 }} whileHover={{scale: 1.5}} whileTap={{scale: 0.8}} className="box"></motion.div>
    </div>
  )
}

export default App