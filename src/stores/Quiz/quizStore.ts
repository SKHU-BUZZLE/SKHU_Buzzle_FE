import { create } from "zustand";

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizStore {
  quizzes: Quiz[];
  currentIndex: number;
  userAnswers: number[]; // 사용자가 선택한 옵션 (인덱스)
  setQuizzes: (quizzes: Quiz[]) => void;
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  currentIndex: 0,
  userAnswers: [],
  setQuizzes: (quizzes) => set({ quizzes, currentIndex: 0, userAnswers: [] }),
  selectAnswer: (answerIndex) =>
    set((state) => ({
      userAnswers: [
        ...state.userAnswers.slice(0, state.currentIndex),
        answerIndex,
      ],
    })),
  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
  resetQuiz: () => set({ currentIndex: 0, userAnswers: [] }),
}));
