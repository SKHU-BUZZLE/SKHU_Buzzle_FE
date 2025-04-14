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

  const [currentMentIndex, setCurrentMentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = Array.from(loadingMents[currentMentIndex]);
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        const currentLength = Array.from(prev).length;

        if (!isDeleting) {
          const next = fullText.slice(0, currentLength + 1).join("");
          if (next === loadingMents[currentMentIndex]) {
            // 문장 다 타이핑 완료 후 삭제 시작 타이머
            setTimeout(() => setIsDeleting(true), 2000);
            clearInterval(typingInterval);
          }
          return next;
        } else {
          const next = fullText.slice(0, currentLength - 1).join("");
          if (next === "") {
            setIsDeleting(false);
            setCurrentMentIndex((prev) => (prev + 1) % loadingMents.length);
            clearInterval(typingInterval);
          }
          return next;
        }
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentMentIndex, isDeleting]);

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
          <p className="mt-4 text-xl font-bold text-center flex gap-1 items-center">
            {displayedText}
            <motion.span
              className="text-xl font-bold"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              |
            </motion.span>
          </p>
        </motion.div>
        <div className="flex h-[30%] justify-center items-center w-full">
          <img className="w-1/2 pb-20" src={BUZZLE} alt="BUZZLE" />
        </div>
      </div>
    </div>
  );
}

export default OpenApp;
