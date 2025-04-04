import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { checkIncorrectAnswer } from "../../api/quiz";

interface QuizResultBarMultiProps {
  isAnswerCorrect: boolean;
}

export default function QuizResultBarMulti({
  isAnswerCorrect,
}: QuizResultBarMultiProps) {
  const [buttonText, setButtonText] = useState<string>("잠시 기다려주세요.");
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    if (isAnswerCorrect) {
      setButtonText("다음 문제를 풀어주세요.");
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 5000);
    } else {
      setButtonText("5초 뒤에 다시 선택해주세요.");
      checkIncorrectAnswer();
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 5000);
    }
  }, [isAnswerCorrect]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute bottom-0 w-full max-w-3xl bg-gray-100 border-t border-gray-300 p-4 flex flex-col items-center gap-3 z-50"
    >
      <div className="flex w-full gap-2 text-2xl font-bold">
        {isAnswerCorrect ? (
          <>
            <CheckCircle className="pt-1 w-6 h-6 text-indigo-600" />
            <span className="text-indigo-600">멋져요 !</span>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="text-red-500">틀렸어요....</span>
          </>
        )}
      </div>
      {isButtonVisible && (
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700">
          {buttonText}
        </button>
      )}
    </motion.div>
  );
}
