import { useEffect, useState } from "react";
import { createMultipleQuizzes } from "../api/quiz";
import ProgressBar from "../components/ProgressBar";
import { useQuizStore } from "../stores/Quiz/quizStore";
import OpenApp from "./loading/OpenApp";

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
    <div className="h-full w-full bg-yellow-300 flex flex-col items-center justify-center relative">
      {/* 진행률 */}
      <div className="mt-5 w-full flex justify-center">
        <ProgressBar progress={progressPercent} />
      </div>

      {/* 퀴즈 영역 */}
      <div className="w-full mt-4 border border-black p-10 max-w-xl">
        <div className="w-full bg-white p-5 rounded-lg">
          <div className="flex justify-center text-3xl text-gray-600 font-bold mb-6">
            {currentQuiz.question}
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleOptionClick("1")}
              className="group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200"
            >
              <span className="font-bold text-3xl text-gray-600 group-hover:text-[#00F224]">
                {currentQuiz.option1}
              </span>
            </button>
            <button
              onClick={() => handleOptionClick("2")}
              className="group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200"
            >
              <span className="font-bold text-3xl text-gray-600 group-hover:text-[#00F224]">
                {currentQuiz.option2}
              </span>
            </button>
            <button
              onClick={() => handleOptionClick("3")}
              className="group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200"
            >
              <span className="font-bold text-3xl text-gray-600 group-hover:text-[#00F224]">
                {currentQuiz.option3}
              </span>
            </button>
            <button
              onClick={() => handleOptionClick("4")}
              className="group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200"
            >
              <span className="font-bold text-3xl text-gray-600 group-hover:text-[#00F224]">
                {currentQuiz.option4}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 결과 영역: 맞았는지/틀렸는지 표시 + 계속하기 버튼 */}
      {showResult && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">
            {isAnswerCorrect ? "정답입니다!" : "오답입니다!"}
          </div>
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-[#00F224] text-white font-bold rounded hover:bg-[#00D81E]"
          >
            계속하기
          </button>
        </div>
      )}
    </div>
  );
}
