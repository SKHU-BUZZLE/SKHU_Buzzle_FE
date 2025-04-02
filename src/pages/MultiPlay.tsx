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

// 메시지 인터페이스
interface QuestionMessage {
  type: "QUESTION";
  question: string;
  options: string[];
}

interface AnswerResultMessage {
  type: "ANSWER_RESULT";
  correct: boolean;
  correctAnswer: string;
  message: string;
}

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

  // 핸들러 객체: 각 메시지 타입에 대한 처리를 분리합니다.
  const messageHandlers: {
    [K in IncomingMessage["type"]]: (
      message: Extract<IncomingMessage, { type: K }>
    ) => void;
  } = {
    QUESTION: (msg: QuestionMessage) => {
      setCurrentQuestion(msg);
      setIsAlreadySelected(false);
      setLastAnswer(null);
      setGameStatus("inGame");
      // 1초 후 잠금 해제 (필요 시)
      setTimeout(() => {
        setIsLocked(false);
      }, 1000);
    },
    ANSWER_RESULT: (msg: AnswerResultMessage) => {
      if (msg.message.includes(email || "")) {
        setLastAnswer(msg);
        setIsAlreadySelected(true);
        setMessageVisible(true);
        setTimeout(() => {
          setMessageVisible(false);
        }, 3000);
      }
    },
    GAME_END: (msg: GameEndMessage) => {
      console.log("게임 종료됨:", msg);
      setCurrentQuestion(null);
      setLastAnswer(null);
      setGameStatus("gameOver");
    },
  };

  useEffect(() => {
    if (!accessToken || !roomId) return;

    const socket = new window.SockJS(
      `https://dwenoeim.store/chat?authorization=${encodeURIComponent(
        accessToken
      )}&roomId=${roomId}`
    );
    const client = window.Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("STOMP 연결 성공");
        // 구독 후 메시지 수신 시 핸들러 호출
        client.subscribe(`/topic/game/${roomId}`, (message) => {
          if (!message || !message.body) return;
          try {
            const parsed: IncomingMessage = JSON.parse(message.body);
            console.log("메시지 수신:", parsed);
            // 메시지 타입에 따라 해당 핸들러 호출
            const handler = messageHandlers[parsed.type];
            if (handler) {
              handler(parsed as any);
            }
          } catch (err) {
            console.error("메시지 파싱 실패:", err);
          }
        });
        // 게임 시작 요청
        client.send(`/app/game/${roomId}/start`, {}, "");
      },
      (error) => {
        console.error("STOMP 연결 실패:", error);
      }
    );

    clientRef.current = client;

    return () => {
      if (lockTimeout) clearTimeout(lockTimeout);
      client.disconnect(() => {
        console.log("연결 종료됨");
      });
    };
  }, [accessToken, roomId, email, lockTimeout]);

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
