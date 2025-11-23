import { motion } from "framer-motion";

interface ErrorProps {
  error: string | null;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-20 p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm max-w-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* 에러 아이콘 */}
      <motion.div
        className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        !
      </motion.div>

      {/* 텍스트 */}
      <motion.h2
        className="text-xl font-semibold text-red-600 mt-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        문제가 발생했어요
      </motion.h2>

      <motion.p
        className="text-gray-700 text-center mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {error}
      </motion.p>

      {/* 버튼 */}
      <motion.button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        다시 시도하기
      </motion.button>
    </motion.div>
  );
};

export default Error;
