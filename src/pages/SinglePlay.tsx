import { useEffect } from "react";
import { createMultipleQuizzes, createQuiz } from "../api/quiz";
import ProgressBar from "../components/ProgressBar";

export function SinglePlay() {
  return (
    <div className="h-full w-full bg-yellow-300 flex flex-col items-center justify-center">
      <ProgressBar progress={23} />
    </div>
  );
}
