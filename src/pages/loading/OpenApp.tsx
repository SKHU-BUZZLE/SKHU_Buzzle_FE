import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BUZZLE from "../../assets/images/BUZZLE1.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function OpenApp() {
  const loadingMents = [
    "버즐이가 딱 맞는 문제를 찾았어요!",
    "열심히 문제 가져오는중! 거의 다 됐어요!",
    "문제를 풀어 볼까요?",
  ];

  const [currentLoadingMent, setCurrentLoadingMent] = useState("");

  useEffect(() => {
    // 처음 메시지 설정
    setCurrentLoadingMent(loadingMents[0]);

    // 4초 후 두 번째 메시지로 변경
    const timer1 = setTimeout(() => {
      setCurrentLoadingMent(loadingMents[1]);
    }, 7000);

    // 10초 후 세 번째 메시지로 변경
    const timer2 = setTimeout(() => {
      setCurrentLoadingMent(loadingMents[2]);
    }, 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="background-yellow justify-center h-full w-full">
      <div className="mt-[30%] flex h-[70%] flex-col justify-between">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center"
        >
          <DotLottieReact
            className="w-full h-[100%]"
            src="https://lottie.host/c64b5fc7-5769-4678-a480-31973cc696d5/e9BcG9jv7N.lottie"
            loop
            autoplay
          />
          <p className="mt-4 text-xl font-bold">{currentLoadingMent}</p>
        </motion.div>
        <div className="flex h-[30%] justify-center items-center w-full">
          <img className="w-1/2 pb-20" src={BUZZLE} alt="BUZZLE" />
        </div>
      </div>
    </div>
  );
}

export default OpenApp;
