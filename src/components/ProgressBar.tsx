import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 ~ 100 사이의 값
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-[90%] h-10 bg-red-500 rounded-full">
      <motion.div
        className="h-full bg-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ProgressBar;
