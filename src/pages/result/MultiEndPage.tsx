import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BUZZLE from "../../assets/images/BUZZLE1.png";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { inGameState, useMultiMatchStore } from "../../stores/multiStore";

interface MultiClearPageProps {
  winner: string;
}

export default function MultiClearPage({ winner }: MultiClearPageProps) {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.user?.email);
  const setMultiState = useMultiMatchStore((state) => state.setState);

  const checkWinner = () => {
    if (winner === email) {
      return "승리!";
    } else {
      return "패배!";
    }
  };
  return (
    <div className="w-full h-screen flex flex-col">
      {/* 상단 로고 영역 */}
      <div className="w-full h-[10%] flex justify-center items-center mt-5">
        <img src={BUZZLE} className="w-[40%]" alt="BUZZLE" />
      </div>

      {/* 중간 영역 (Lottie, 텍스트) */}
      <div className="w-full h-[60%] flex flex-col items-center justify-center">
        <DotLottieReact
          className="w-full"
          src="https://lottie.host/61121bbb-c84b-4d8b-835a-50f7594a7b2c/Eyoq6ZP8Hf.lottie"
          loop
          autoplay
        />
        {/* 예시로 EXP 표시를 추가하고 싶다면 */}

        <div className="mt-3 text-3xl font-bold">{checkWinner()}</div>
        <div className="mt-6 text-center font-bold">
          {winner === email ? (
            <p>
              축하해요! <br />
              10EXP++{" "}
            </p>
          ) : (
            <p>
              아쉬워요... <br />
            </p>
          )}
        </div>
      </div>

      {/* 하단 영역 (버튼) */}
      <div className="w-full h-[30%] flex justify-center items-center">
        <button
          onClick={() => {
            navigate("/home");
            setMultiState(inGameState.ready);
          }}
          className="w-[90%] mt-10 h-14 rounded-md bg-white text-lg font-bold border border-gray-300 hover:bg-gray-100"
        >
          계속하기
        </button>
      </div>
    </div>
  );
}
