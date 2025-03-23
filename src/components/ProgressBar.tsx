import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 ~ 100 사이의 값
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // "fast - slow - fast" 효과를 주기 위해 0%, 40%, 45%, 최종(progress)%로 설정
  return (
    <div className="w-[90%] h-10 bg-red-500 rounded-full">
      <motion.div
        className="h-full bg-blue-500 rounded-full"
        initial={{ width: "0%" }}
        animate={{
          width: `${progress}%`,
        }}
        transition={{
          duration: 1,
          // 각 키프레임의 시간 비율 (0~1)
          times: [0, 0.3, 0.7, 1],
          // 각 구간별 easing 설정: 첫 구간 빠르게(easeOut), 중간 느리게(easeInOut), 마지막 빠르게(easeOut)
          ease: ["easeOut", "easeInOut", "easeOut"],
        }}
      />
    </div>
  );
};

export default ProgressBar;
