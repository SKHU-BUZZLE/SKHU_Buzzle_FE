import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopStatusBar from "../components/TopStatusBar";
import { useUserStore } from "../stores/userStore";

const HomeImagesUrl = [
  "https://lottie.host/d245b7df-8f3e-4ddf-a40c-47115d14bd64/SFz8jCXuNp.lottie",
  "https://lottie.host/da232444-3780-42b0-92b3-c0d7a7ddecc6/Rkn68rQYut.lottie",
  "https://lottie.host/26fe991b-9a01-44ad-b20a-152c7008778a/K0lp3DyuiV.lottie",
];

const HomeMent = [
  "오늘의 퀴즈가 준비됐어요!",
  "오늘도 도전해볼까요? 🚀",
  "퀴즈를 풀어보세요!",
];

export default function Home() {
  const navigate = useNavigate();
  const { user, life, fetchUser, fetchLife } = useUserStore();

  const [randomLottie, setRandomLottie] = useState(HomeImagesUrl[0]);
  const [randomMent, setRandomMent] = useState(HomeMent[0]);

  useEffect(() => {
    fetchUser();
    fetchLife();

    const randomIndex = Math.floor(Math.random() * HomeImagesUrl.length);
    setRandomLottie(HomeImagesUrl[randomIndex]);
    setRandomMent(HomeMent[randomIndex]);
  }, []);

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <TopStatusBar life={life} />

      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6">
        {/* 인사 텍스트 */}
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          반가워요, {user?.name}님!
        </motion.h1>

        {/* Lottie */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <DotLottieReact
            key={randomLottie}
            src={randomLottie}
            loop
            autoplay
            className="w-full h-full"
          />
        </motion.div>

        {/* 멘트 */}
        <motion.p
          className="text-2xl font-semibold text-[#6D6D6D]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {randomMent}
        </motion.p>

        {/* 버튼 */}
        <motion.button
          onClick={() => {
            navigate("/singlePlay");
          }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          풀러가기
        </motion.button>
      </div>
    </motion.div>
  );
}
