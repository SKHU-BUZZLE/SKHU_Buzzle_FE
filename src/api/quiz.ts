import { axiosInstance } from "./index";

export const createQuiz = (category: string) => {
  return axiosInstance.post("/quiz", { category });
};

// 다중 퀴즈 생성
export const createMultipleQuizzes = (category: string, size: number) => {
  return axiosInstance.post("/quiz/multiple", {
    category,
    size,
  });
};

//정답 체크
export const checkCorrectAnswer = (answer: string) => {
  return axiosInstance.post("/quiz/correct-answer", answer, {
    headers: { "Content-Type": "application/json" },
  });
};

//오답 체크
export const checkIncorrectAnswer = () => {
  return axiosInstance.get("/quiz/incorrect-answer", {});
};
