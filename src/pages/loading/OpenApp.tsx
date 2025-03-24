import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BUZZLE from "../../assets/images/BUZZLE1.png";

import { motion } from "framer-motion";

function OpenApp() {
  return (
    <div className="background-yellow justify-center h-full w-full">
      <div className="mt-[30%] flex h-[70%] flex-col justify-between">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full "
        >
          {" "}
          <DotLottieReact
            className="w-full h-[100%]"
            src="https://lottie.host/c64b5fc7-5769-4678-a480-31973cc696d5/e9BcG9jv7N.lottie"
            loop
            autoplay
          />
        </motion.div>
        <div className="flex h-[30%] justify-center items-center w-full ">
          <img className="w-1/2 pb-20" src={BUZZLE} />
        </div>
      </div>
    </div>
  );
}

export default OpenApp;
