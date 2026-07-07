
import { motion } from 'framer-motion'
import { useRef } from 'react'

export function ResponsiveText({ children, delay = 1, hoverText = 'MORE' }) {

  let ref = useRef(null)
  const isDesktop = window.matchMedia('(pointer: fine)').matches
  

  function handleMouseMove(e) {
    if(isDesktop){
      if (!ref) return
  
      const rect = e.currentTarget.getBoundingClientRect()
  
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
  
      if (ref.current) {
        ref.current.style.left = `${x}px`
        ref.current.style.top = `${y}px`
      }

    }

  }

  function handleClick() {
    if (ref) {
      const text = ref.current.querySelector('p')
      const img = ref.current.querySelector('img')
      text.style.opacity = "0"
      img.style.opacity = "0"

      setTimeout(() => {
        document.body.style.overflowX = "hidden"
        ref.current.style.transition = "transform 2s ease, border-radius 2s ease"
        ref.current.style.transform = "translate(-50%, -50%) scale(20)"

      }, 700);

    }
  }


  return (
    <span
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onClick={handleClick}
      className="relative group inline-block cursor-pointer mx-1 hover:text-white hover:cursor-none transition-all duration-500"
    >
      {children}

      <motion.span
        className="absolute left-0 bottom-0 h-[1px] w-full bg-white group-hover:scale-0 transition-all duration-500"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
        style={{ transformOrigin: "left" }}
      />

      <span
        ref={ref}
        style={{display: `${isDesktop ? 'flex' : 'none'}`}}
        className='absolute -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col justify-center items-center  pointer-events-none z-[100000] w-[150px] h-[150px] rounded-[50%] bg-white scale-0 group-hover:scale-100  transition-transform duration-300'
      >
        <img className='w-[20px] transition-opacity duration-500' src="/images/up-arrow.svg" alt="->" />
        <p className='text-black text-center font-[Ubuntu] text-[16px] transition-opacity duration-500'>{hoverText}</p>
      </span>
      <span className='absolute w-full h-full bg-[#9b78f5] top-0 left-0 -z-1 [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-[clip-path] duration-500'>

      </span>
    </span>
  )
}






