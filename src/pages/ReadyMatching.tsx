import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Navigate, useNavigate } from "react-router-dom";
import { inGameState, useMultiMatchStore } from "../stores/multiStore";
import { useUserStore } from "../stores/userStore";
import TopStatusBar from "../components/TopStatusBar";

const HomeImagesUrl = [
  "https://lottie.host/d245b7df-8f3e-4ddf-a40c-47115d14bd64/SFz8jCXuNp.lottie",
  "https://lottie.host/da232444-3780-42b0-92b3-c0d7a7ddecc6/Rkn68rQYut.lottie",
  "https://lottie.host/26fe991b-9a01-44ad-b20a-152c7008778a/K0lp3DyuiV.lottie",
];

const MultiMent = [
  "오늘의 퀴즈가 준비됐어요!",
  "오늘도 도전해볼까요? 🚀",
  "퀴즈를 풀어보세요!",
];

export default function ReadyMatching() {
  const navigate = useNavigate();
  const setMultiState = useMultiMatchStore((state) => state.setState);
  const { user, life, fetchUser, fetchLife } = useUserStore();

  const [randomLottie, setRandomLottie] = useState(HomeImagesUrl[0]);
  const [randomMent, setRandomMent] = useState(MultiMent[0]);

  useEffect(() => {
    fetchUser();
    fetchLife();

    const randomIndex = Math.floor(Math.random() * HomeImagesUrl.length);
    setRandomLottie(HomeImagesUrl[randomIndex]);
    setRandomMent(MultiMent[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <TopStatusBar life={life} />

      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6">
        <h1 className="text-4xl font-bold text-center">다른 유저와 대전하기</h1>

        <div className="w-full">
          <DotLottieReact
            key={randomLottie}
            src={randomLottie}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <div className="w-full flex flex-col items-center">
          {" "}
          <p className="text-4xl font-semibold text-[#6D6D6D]">
            다른 유저와 배틀해요!
          </p>
          <p className="justify-center items-center font-semibold text-[#6D6D6D]">
            총 7문제 중
          </p>
          <p className="justify-center items-center font-semibold text-[#6D6D6D]">
            더 많은 문제를 맞추면 승리해요!
          </p>
        </div>

        <button
          onClick={() => {
            console.log("클릭");
            setMultiState(inGameState.matching);
          }}
          className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
        >
          대전하기
        </button>
      </div>
    </div>
  );
}
