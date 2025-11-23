import { motion } from "framer-motion";

const Pending = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-12 h-12 border-4 border-gray-500 rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: [0.5, 0.65, 0.7, 0.85],
        }}
      />
    </div>
  );
};

export default Pending;
