import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TopStatusBar from "../components/TopStatusBar";
import { useUserStore } from "../stores/userStore";
import { motion } from "framer-motion";

export default function MultiMatching() {
  const { fetchLife, life } = useUserStore();
  const [displayedText, setDisplayedText] = useState("");
  const texts = ["상대방을 찾는 중입니다..."];
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchLife();

    const fullText = Array.from(texts[loopIndex % texts.length]);

    const typingLoop = setInterval(() => {
      setDisplayedText((prev) => {
        const currentLength = Array.from(prev).length;
        if (!isDeleting) {
          const next = fullText.slice(0, currentLength + 1).join("");
          if (next === texts[loopIndex % texts.length]) {
            setTimeout(() => setIsDeleting(true), 2000);
            clearInterval(typingLoop);
          }
          return next;
        } else {
          const next = fullText.slice(0, currentLength - 1).join("");
          if (next === "") {
            setIsDeleting(false);
            setLoopIndex((prev) => prev + 1);
            clearInterval(typingLoop);
          }
          return next;
        }
      });
    }, 100);

    return () => clearInterval(typingLoop);
  }, [loopIndex, isDeleting]);

  return (
    <motion.div
      className="min-h-screen w-full bg-white flex flex-col justify-between items-center pb-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 배경 블러 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-10 backdrop-blur-sm z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <TopStatusBar life={life} />

      <div className="flex flex-col items-center justify-center flex-1 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full h-[50%]"
        >
          <DotLottieReact
            src="https://lottie.host/c3efbf67-bbbb-4b7b-b7a9-500e9a4c32c1/G7orTju8ZT.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="text-xl font-bold mt-6 text-gray-800 flex items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {displayedText}
          <motion.span
            className="text-xl font-bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            |
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
