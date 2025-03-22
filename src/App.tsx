import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function App() {
  return (
    <>
    
      <Routes location={location}>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<LoginPage />} />
          {/* <Route  path="main" element={<div className="w-full justify-center" >    <DotLottieReact className=""
      src="https://lottie.host/9806b5eb-cb12-4063-bc82-0a238cf7c1e1/XdwHmrzE6b.lottie"
      loop
      autoplay
    />메인페이지</div>} /> */}
          <Route path="game" element={<div />} />
          </Route >
      </Routes>
    </>
  );
}

