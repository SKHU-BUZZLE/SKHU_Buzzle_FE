import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useMultiMatchStore } from "../stores/multiStore";
import { useUserStore } from "../stores/userStore";
import QuizAreaMulti from "../components/Quiz/QuizAreaMulti";
import QuizStatusBar from "../components/Quiz/QuizStatusBar";
import QuizProgressSection from "../components/Quiz/QuizProgressSection";
import QuizResultBarMulti from "../components/Quiz/QuizResultBarMulti";
import { AnimatePresence } from "framer-motion";
import OpenApp from "./loading/OpenApp";
import ClearPage from "./result/ClearPage";

// 문제 메시지
interface QuestionMessage {
  type: "QUESTION";
  question: string;
  options: string[];
}

// 정답 결과 메시지
interface AnswerResultMessage {
  type: "ANSWER_RESULT";
  correct: boolean;
  correctAnswer: string;
  message: string;
}

// 게임 종료 메시지
interface GameEndMessage {
  type: "GAME_END";
  message: string;
}

type IncomingMessage = QuestionMessage | AnswerResultMessage | GameEndMessage;

export default function MultiPlay() {
  const clientRef = useRef<ReturnType<typeof window.Stomp.over> | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { roomId } = useMultiMatchStore();
  const email = useUserStore((state) => state.user?.email);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionMessage | null>(null);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<AnswerResultMessage | null>(
    null
  );
  const [gameStatus, setGameStatus] = useState<
    "waiting" | "inGame" | "gameOver"
  >("waiting");

  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeout, setLockTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!accessToken || !roomId) {
      return;
    }

    const socket = new window.SockJS(
      `https://dwenoeim.store/chat?authorization=${encodeURIComponent(
        accessToken
      )}&roomId=${roomId}`
    );
    const client = window.Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log(" STOMP 연결 성공");

        client.subscribe(`/topic/game/${roomId}`, (message) => {
          if (!message || !message.body) return;

          const parsed: IncomingMessage = JSON.parse(message.body);
          console.log("메시지 수신:", parsed);

          switch (parsed.type) {
            case "QUESTION":
              setCurrentQuestion(parsed);
              setIsAlreadySelected(false);
              setLastAnswer(null);
              setGameStatus("inGame");
              setTimeout(() => {
                setIsLocked(false);
              }, 1000);
              break;
            case "ANSWER_RESULT":
              if (parsed.message.includes(email || "")) {
                setLastAnswer(parsed);
                setIsAlreadySelected(true);
                setMessageVisible(true);
                setTimeout(() => {
                  setMessageVisible(false);
                }, 3000);
              }
              break;
            case "GAME_END":
              console.log("게임 종료됨:", parsed);
              setCurrentQuestion(null);
              setLastAnswer(null);
              setGameStatus("gameOver");
              break;
            default:
              break;
          }
        });

        client.send(`/app/game/${roomId}/start`, {}, "");
      },
      (error) => {
        console.error(" STOMP 연결 실패:", error);
      }
    );

    clientRef.current = client;

    return () => {
      if (lockTimeout) clearTimeout(lockTimeout);
      client.disconnect(() => {
        console.log("연결 종료됨");
      });
    };
  }, [accessToken, roomId, email]);

  const submitAnswer = (index: number) => {
    if (isLocked || isAlreadySelected) return;
    clientRef.current?.send(
      `/app/game/${roomId}/answer`,
      {},
      JSON.stringify({ index })
    );
    setIsAlreadySelected(true);
    setIsLocked(true);

    setLockTimeout(
      setTimeout(() => {
        setIsLocked(false);
        setIsAlreadySelected(false);
      }, 5000)
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start relative">
      {gameStatus === "waiting" && <OpenApp />}
      {gameStatus === "gameOver" && <ClearPage />}

      {gameStatus === "inGame" && (
        <>
          <div className="w-full flex justify-center mt-3">
            <QuizProgressSection progress={0} />
          </div>

          <div className="w-full flex flex-col items-center font-bitbit-light text-xl">
            <QuizStatusBar life={50} />
            {currentQuestion && (
              <QuizAreaMulti
                quiz={{
                  question: currentQuestion.question,
                  option1: currentQuestion.options[0],
                  option2: currentQuestion.options[1],
                  option3: currentQuestion.options[2],
                  option4: currentQuestion.options[3],
                }}
                onOptionClick={(selectedIndex: string) =>
                  submitAnswer(Number(selectedIndex) - 1)
                }
                isLocked={isLocked}
                isDisabled={isAlreadySelected}
              />
            )}
          </div>

          <AnimatePresence>
            {messageVisible && lastAnswer && (
              <QuizResultBarMulti
                key={`lastAnswer-${email}`}
                isAnswerCorrect={lastAnswer.correct}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
