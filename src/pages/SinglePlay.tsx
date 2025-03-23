import { useEffect, useState } from "react";
import { createMultipleQuizzes } from "../api/quiz";
import { useQuizStore } from "../stores/Quiz/quizStore";
import OpenApp from "./loading/OpenApp";
import QuizArea from "../components/Quiz/QuizArea";
import QuizResultBar from "../components/Quiz/QuizResultBar";
import { AnimatePresence } from "framer-motion";
import QuizProgressSection from "../components/Quiz/QuizProgressSection";
import QuizStatusBar from "../components/Quiz/QuizStatusBar";

export function SinglePlay() {
  const { quizzes, setQuizzes } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  // 새로운 상태
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // 옵션 클릭 시 정답 비교
  const handleOptionClick = (selectedOption: string) => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedOption === currentQuiz.answer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    setShowResult(true); // 결과 보여주기
  };

  // "계속하기" 버튼 클릭 시 다음 문제로 이동
  const handleContinue = () => {
    setShowResult(false);
    setIsAnswerCorrect(false);
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    createMultipleQuizzes("ALL", 10).then((res) => {
      const quizData = res.data.data.quizResDtos;
      setQuizzes(quizData);
      setIsLoading(false);
    });
  }, [setQuizzes]);

  // 로딩 중일 때
  if (isLoading) {
    return <OpenApp />;
  }

  // 모든 퀴즈를 풀었으면 완료 화면
  if (currentQuizIndex >= quizzes.length) {
    return (
      <div className="h-full w-full bg-yellow-300 flex items-center justify-center">
        <div className="text-3xl font-bold">퀴즈 완료!</div>
      </div>
    );
  }

  // 현재 퀴즈
  const currentQuiz = quizzes[currentQuizIndex];
  // 진행률 계산
  const progressPercent = (currentQuizIndex / quizzes.length) * 100;

  return (
    <div className="h-full w-full bg-yellow-300 flex flex-col items-center justify-start relative">
      {/* 진행률 */}
      <div className="  w-full flex justify-center mt-10">
        <QuizProgressSection progress={progressPercent} />
      </div>

      {/* 퀴즈 영역 */}
      <div className="mt-[100px] w-full flex flex-col items-center">
        <QuizStatusBar life={50} />
        <QuizArea quiz={currentQuiz} onOptionClick={handleOptionClick} />
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
