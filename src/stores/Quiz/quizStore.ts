import { create } from "zustand";

interface Quiz {
  id: number;
  message: string;
  data: string[];
  answer: string;
}

interface QuizStore {
  quizzes: Quiz[];
  currentIndex: number;
  userAnswers: number[];
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
