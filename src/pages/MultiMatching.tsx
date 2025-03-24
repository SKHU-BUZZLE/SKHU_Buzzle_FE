import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import heart from "../assets/icons/heart.svg";
import stamp from "../assets/icons/stamp.svg";

export default function MultiMatching() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between items-center pb-24 pt-10">
      <div className="w-full px-6 flex justify-between items-center">
        <div>
          <img className="w-7 h-7" src={stamp} />
        </div>
        <div className="flex items-center gap-1">
          <img className="w-7 h-7" src={heart} />
          <span className="text-lg font-semibold">50</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <DotLottieReact
          className="w-full h-[50%]"
          src="https://lottie.host/c3efbf67-bbbb-4b7b-b7a9-500e9a4c32c1/G7orTju8ZT.lottie"
          loop
          autoplay
        />

        <p className="text-xl font-bold mt-6">매칭중..</p>
      </div>
    </div>
  );
}
