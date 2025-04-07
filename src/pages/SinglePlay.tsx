import { useEffect, useState } from "react";
import { checkIncorrectAnswer, createMultipleQuizzes } from "../api/quiz";
import { useQuizStore } from "../stores/Quiz/quizStore";
import OpenApp from "./loading/OpenApp";
import QuizArea from "../components/Quiz/QuizArea";
import QuizResultBar from "../components/Quiz/QuizResultBarSingle";
import { AnimatePresence, motion } from "framer-motion";
import QuizProgressSection from "../components/Quiz/QuizProgressSection";
import QuizStatusBar from "../components/Quiz/QuizStatusBar";
import ClearPage from "./result/ClearPage";
import FailedPage from "./result/FailedPage";
import { useUserStore } from "../stores/userStore";

export function SinglePlay() {
  const { quizzes, setQuizzes } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const { life, fetchLife } = useUserStore();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleOptionClick = (selectedOption: string) => {
    setIsAlreadySelected(true);
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedOption === currentQuiz.answer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
      checkIncorrectAnswer();
    }
    setShowResult(true);
  };

  const handleContinue = () => {
    setIsAlreadySelected(false);
    setShowResult(false);
    setIsAnswerCorrect(false);
    fetchLife();
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    createMultipleQuizzes("ALL", 10).then((res) => {
      const quizData = res.data.data.quizResDtos;
      setQuizzes(quizData);
      setIsLoading(false);
      fetchLife();
    });
  }, [setQuizzes]);

  if (isLoading) {
    return <OpenApp />;
  }

  if (currentQuizIndex >= quizzes.length) {
    return <ClearPage />;
  }

  if (life <= 0) {
    return <FailedPage />;
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const progressPercent = (currentQuizIndex / quizzes.length) * 100;

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-start relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 진행률 */}
      <div className="w-full flex justify-center mt-3">
        <QuizProgressSection progress={progressPercent} />
      </div>

      {/* 퀴즈 영역 (애니메이션 적용) */}
      <motion.div
        key={currentQuizIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col items-center font-bitbit-light text-xl"
      >
        <QuizStatusBar life={life} />
        <QuizArea
          isDisabled={isAlreadySelected}
          quiz={currentQuiz}
          onOptionClick={handleOptionClick}
        />
      </motion.div>

      {/* 결과 영역 */}
      <AnimatePresence>
        {showResult && (
          <QuizResultBar
            isAnswerCorrect={isAnswerCorrect}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
