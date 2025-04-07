import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import BUZZLE from "../../assets/images/BUZZLE1.png";
import { useNavigate } from "react-router-dom";

export default function ClearPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 상단 로고 영역 */}
      <motion.div
        className="w-full h-[10%] flex justify-center items-center mt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img src={BUZZLE} className="w-[40%]" alt="BUZZLE" />
      </motion.div>

      {/* 중간 영역 (Lottie, 텍스트) */}
      <motion.div
        className="w-full h-[60%] flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full"
        >
          <DotLottieReact
            src="https://lottie.host/61121bbb-c84b-4d8b-835a-50f7594a7b2c/Eyoq6ZP8Hf.lottie"
            loop
            autoplay
            className="w-full"
          />
        </motion.div>

        <motion.div
          className="mt-3 text-3xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          좋아요!
        </motion.div>

        <motion.div
          className="mt-6 text-center font-bold text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <p>한 세트를 완료했어요!</p>
          <p>더 다양한 문제들을 만나보세요!</p>
        </motion.div>
      </motion.div>

      {/* 하단 영역 (버튼) */}
      <motion.div
        className="w-full h-[30%] flex justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.button
          onClick={() => {
            navigate("/home");
          }}
          whileHover={{ scale: 1.03 }}
          className="w-[90%] mt-10 h-14 rounded-md bg-white text-lg font-bold border border-gray-300 hover:bg-gray-100 transition"
        >
          계속하기
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
