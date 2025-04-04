import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { inGameState, useMultiMatchStore } from "../stores/multiStore";
import { useUserStore } from "../stores/userStore";
import TopStatusBar from "../components/TopStatusBar";
import { cancelMatching, startMatching } from "../api/multiplay";

const HomeImagesUrl = [
  "https://lottie.host/d245b7df-8f3e-4ddf-a40c-47115d14bd64/SFz8jCXuNp.lottie",
  "https://lottie.host/da232444-3780-42b0-92b3-c0d7a7ddecc6/Rkn68rQYut.lottie",
  "https://lottie.host/26fe991b-9a01-44ad-b20a-152c7008778a/K0lp3DyuiV.lottie",
];

export default function ReadyMatching() {
  const setMultiState = useMultiMatchStore((state) => state.setState);
  const { life, fetchUser, fetchLife } = useUserStore();

  const [randomLottie, setRandomLottie] = useState(HomeImagesUrl[0]);

  useEffect(() => {
    fetchUser();
    fetchLife();
    cancelMatching();

    const randomIndex = Math.floor(Math.random() * HomeImagesUrl.length);
    setRandomLottie(HomeImagesUrl[randomIndex]);
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
        {/* 타이틀 */}
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          다른 유저와 대전하기
        </motion.h1>

        {/* Lottie 애니메이션 */}
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

        {/* 설명 텍스트 */}
        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-4xl font-semibold text-[#6D6D6D]">
            다른 유저와 배틀해요!
          </p>
          <p className="font-semibold text-[#6D6D6D]">총 7문제 중</p>
          <p className="font-semibold text-[#6D6D6D]">
            더 많은 문제를 맞추면 승리해요!
          </p>
        </motion.div>

        {/* 대전 버튼 */}
        <motion.button
          onClick={() => {
            setMultiState(inGameState.matching);
            startMatching();
          }}
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
        >
          대전하기
        </motion.button>
      </div>
    </motion.div>
  );
}
