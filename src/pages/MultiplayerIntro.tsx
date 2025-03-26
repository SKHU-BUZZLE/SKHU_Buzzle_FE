import { useNavigate } from "react-router-dom";
import TopStatusBar from "../components/TopStatusBar";
import { useUserStore } from "../stores/userStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function MultiplayerIntro() {
  const navigate = useNavigate();
  const { life } = useUserStore();

  const handleConfirm = () => {
    navigate("/multiplay");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-between pb-24 pt-10">
      {/* 상단 상태바 */}
      <TopStatusBar life={life} />

      {/* 콘텐츠 */}
      <div className="flex flex-col items-center text-center px-6 flex-1 justify-center">
        <h1 className="text-3xl font-extrabold mb-4">버즐 대전하기</h1>

        <DotLottieReact
          className="w-full h-[50%] mb-4"
          src="https://lottie.host/00b5a5dd-d0e8-4e3a-92a0-4c631547ea69/Xbmxi52C7Z.lottie"
          loop
          autoplay
        />

        <p className="text-xl font-semibold text-gray-700 mb-2">
          다른 유저와 배틀해요!
        </p>
        <div className="text-sm text-gray-600 leading-tight">
          <p className="mb-1">
            총 <span className="font-bold">7문제</span> 중
          </p>
          <p className="mb-1">더 많은 문제를 맞추면 승리해요</p>
          <p>매칭에는 시간이 조금 걸릴 수 있어요.</p>
        </div>
      </div>

      {/* 버튼 */}
      <button
        onClick={handleConfirm}
        className="bg-[#00E71A] text-white text-lg font-bold py-3 px-6 w-[90%] rounded-xl hover:bg-[#00c817] active:scale-95 transition"
      >
        알겠어요
      </button>
    </div>
  );
}
