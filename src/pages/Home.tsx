import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuthStore } from "../stores/authStore";
import heart from "../assets/icons/heart.svg";

import Pawn from "../assets/images/icons8-pawn-64.png";
import { Navigate, useNavigate } from "react-router-dom";

const HomeImagesUrl = [
  "https://lottie.host/d245b7df-8f3e-4ddf-a40c-47115d14bd64/SFz8jCXuNp.lottie",
  "https://lottie.host/da232444-3780-42b0-92b3-c0d7a7ddecc6/Rkn68rQYut.lottie",
  "https://lottie.host/26fe991b-9a01-44ad-b20a-152c7008778a/K0lp3DyuiV.lottie",
];

const HomeMent = [
  "오늘의 퀴즈가 준비됐어요!",
  "오늘도 도전해볼까요? 🚀",
  "퀴즈를 풀어보세요!",
];

export default function Home() {
  const userName = "남규";
  const navigate = useNavigate();
  const heartScore = 50;

  const [randomLottie, setRandomLottie] = useState(HomeImagesUrl[0]);
  const [randomMent, setRandomMent] = useState(HomeMent[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HomeImagesUrl.length);
    setRandomLottie(HomeImagesUrl[randomIndex]);
    setRandomMent(HomeMent[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <img src={Pawn} alt="Chess" className="w-8 h-8" />
        <div className="flex items-center gap-1">
          <img className="w-7 h-7" src={heart} />
          <span className="font-bold text-lg">{heartScore}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6">
        <h1 className="text-4xl font-bold text-center">
          반가워요, {userName}님!
        </h1>

        <div className="w-full">
          <DotLottieReact
            key={randomLottie}
            src={randomLottie}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <p className="text-2xl font-semibold text-[#6D6D6D]">{randomMent}</p>

        <button
          onClick={() => {
            navigate("/singlePlay");
          }}
          className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
        >
          풀러가기
        </button>
      </div>
    </div>
  );
}
