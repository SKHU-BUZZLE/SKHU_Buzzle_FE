import { useEffect } from "react";
import { createQuiz } from "../api/quiz";

export default function Home() {
  useEffect(() => {
    const fetchQuiz = async () => {
      const category = "HISTORY";
      try {
        const res = await createQuiz(category);
        console.log("퀴즈 생성 성공:", res.data);
      } catch (err) {
        console.error("퀴즈 생성 실패:", err);
      }
    };

    fetchQuiz();
  }, []);

  return <h1 className="text-3xl">home</h1>;
}
