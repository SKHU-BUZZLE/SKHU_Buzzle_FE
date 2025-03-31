import { useEffect, useState } from "react";
import { checkIncorrectAnswer, createMultipleQuizzes } from "../api/quiz";
import { useQuizStore } from "../stores/Quiz/quizStore";
import OpenApp from "./loading/OpenApp";
import QuizArea from "../components/Quiz/QuizArea";
import QuizResultBar from "../components/Quiz/QuizResultBar";
import { AnimatePresence } from "framer-motion";
import QuizProgressSection from "../components/Quiz/QuizProgressSection";
import QuizStatusBar from "../components/Quiz/QuizStatusBar";
import ClearPage from "./result/ClearPage";
import { useUserStore } from "../stores/userStore";
import FailedPage from "./result/FailedPage";

export function SinglePlay() {
  const { quizzes, setQuizzes } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const { life, fetchLife } = useUserStore();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);

  // 새로운 상태
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // 옵션 클릭 시 정답 비교
  const handleOptionClick = (selectedOption: string) => {
    setIsAlreadySelected(true);
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedOption === currentQuiz.answer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
      checkIncorrectAnswer();
    }
    setShowResult(true); // 결과 보여주기
  };

  // "계속하기" 버튼 클릭 시 다음 문제로 이동
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

  // 로딩 중일 때
  if (isLoading) {
    return <OpenApp />;
  }

  // 모든 퀴즈를 풀었으면 완료 화면
  if (currentQuizIndex >= quizzes.length) {
    return <ClearPage />;
  }

  if (life <= 0) {
    return <FailedPage />;
  }

  // 현재 퀴즈
  const currentQuiz = quizzes[currentQuizIndex];
  // 진행률 계산
  const progressPercent = (currentQuizIndex / quizzes.length) * 100;

  return (
    <div className="h-full w-full  flex flex-col items-center justify-start relative ">
      {/* 진행률 */}
      <div className="  w-full flex justify-center mt-3 ">
        <QuizProgressSection progress={progressPercent} />
      </div>

      {/* 퀴즈 영역 */}
      <div className=" w-full flex flex-col items-center  font-bitbit-light text-xl">
        <QuizStatusBar life={life} />
        <QuizArea
          isDisabled={isAlreadySelected}
          quiz={currentQuiz}
          onOptionClick={handleOptionClick}
        />
      </div>

      {/* 결과 영역: 맞았는지/틀렸는지 표시 + 계속하기 버튼 */}

      <AnimatePresence>
        {showResult && (
          <QuizResultBar
            isAnswerCorrect={isAnswerCorrect}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
