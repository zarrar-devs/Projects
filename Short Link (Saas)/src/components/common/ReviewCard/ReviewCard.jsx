import { motion } from 'framer-motion'


export function ReviewCard({ img, name, aboutUser, review, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotate: -5, scale: 0.9 }}
      animate={
        visible ? { opacity: 1, y: 0, scale: 1, rotate: 0, zIndex: 30 } 
        : {opacity: 0,y: -40, rotate: 20,scale: 0.9,zIndex: 0}
    }
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=' absolute cursor-grab h-full w-full max-w-[600px] md:w-[80%] pointer-events-none  bg-white p-5 md:p-12 rounded-2xl flex flex-col justify-center gap-3 '
    >
      <div>
        <img className='w-[30px]' src="/images/reviewer-images/quotation-mark.png" alt="?" />
      </div>

      <div>
        <p className='text-[#031f39] text-[18px] sm:text-xl font-[Inter] font-bold '>{review}</p>
      </div>

      <div className='flex p-2 gap-2 items-center'>
        <img className='w-[80px] h-[80px] rounded-xl md:rounded-[30%] object-cover object-top' src={img} alt="USER" />
        <div>
          <p className='text-[black] font-[Inter] text-[16px] sm:text-xl'>{name}</p>
          <p className='text-gray-500 font-[Ubuntu] text-[10px] sm:text-sm font-normal'>{aboutUser}</p>
        </div>
      </div>

    </motion.div>
  )
}