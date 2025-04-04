import { useEffect, useState } from "react";
import BUZZLE from "../../assets/images/BUZZLE1.png";
import kakao from "../../assets/images/kakao.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Login() {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  };
  const LoginImagesUrl = [
    "https://lottie.host/d245b7df-8f3e-4ddf-a40c-47115d14bd64/SFz8jCXuNp.lottie",
    "https://lottie.host/da232444-3780-42b0-92b3-c0d7a7ddecc6/Rkn68rQYut.lottie",
    "https://lottie.host/26fe991b-9a01-44ad-b20a-152c7008778a/K0lp3DyuiV.lottie",
  ];

  const [randomLottie, setRandomLottie] = useState(LoginImagesUrl[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * LoginImagesUrl.length);
    setRandomLottie(LoginImagesUrl[randomIndex]);
  }, []);
  return (
    <div className="min-h-screen w-full bg-yellow-300 flex flex-col justify-between items-center px-6 py-12">
      <div className="flex flex-col items-center justify-center mt-24">
        <img className="w-1/2 " src={BUZZLE} />
        <p className="text-white text-[16px] font-bold mt-2 md:text-xl">
          지식을 더하다.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mb-10">
        <DotLottieReact
          key={randomLottie}
          src={randomLottie}
          loop
          autoplay
          className="w-full h-full"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#FEE102] text-black font-semibold py-3 rounded-lg text-center flex items-center justify-center gap-2"
        >
          <img src={kakao} alt="Kakao Logo" className=" w-5 h-5 " />
          Kakao로 시작하기
        </button>
      </div>
    </div>
  );
}
