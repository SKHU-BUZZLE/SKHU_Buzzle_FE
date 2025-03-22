import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BUZZLE from "../../assets/images/BUZZLE1.png";

function OpenApp() {
  return (
    <div className="background-yellow justify-center h-full w-full">
      <div className="mt-[30%] flex h-[70%] flex-col justify-between">
        <div className="flex w-full ">
          {" "}
          <DotLottieReact
            className="w-full h-[100%]"
            src="https://lottie.host/c64b5fc7-5769-4678-a480-31973cc696d5/e9BcG9jv7N.lottie"
            loop
            autoplay
          />
        </div>
        <div className="flex  justify-center items-center w-full ">
          <img className="w-1/2" src={BUZZLE} />
        </div>
      </div>
    </div>
  );
}

export default OpenApp;
