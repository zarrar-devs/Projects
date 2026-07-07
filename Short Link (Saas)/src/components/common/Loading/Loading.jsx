import { motion } from "framer-motion";

export function Loading({size='24px',color="yellow"}) {
  return (
      <motion.div
        style={{width: size, height: size,borderTopColor: color}}
        className="rounded-full border-4 border-gray-700"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
  );
}



