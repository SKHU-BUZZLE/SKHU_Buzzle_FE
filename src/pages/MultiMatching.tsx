import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TopStatusBar from "../components/TopStatusBar";

export default function MultiMatching() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between items-center pb-24 pt-10">
      <TopStatusBar life={50} />

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
