import { Navigate, Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/Login";
import OpenApp from "./pages/loading/OpenApp";
import OAuthCallback from "./pages/OAuthCallback";
import { SinglePlay } from "./pages/SinglePlay";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ClearPage from "./pages/result/ClearPage";
import FailedPage from "./pages/result/FailedPage";

import { useAuthStore } from "./stores/authStore";
import MyPage from "./pages/MyPage";

import { useSSEPolyfill } from "./hooks/useSSE";
import MutltiRoute from "./routes/MultiRoute";

export default function App() {
  const { isAuthenticated } = useAuthStore();

  useSSEPolyfill();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="loading" element={<OpenApp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="api/oauth2/callback/kakao" element={<OAuthCallback />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="singlePlay" element={<SinglePlay />} />
          <Route path="multiPlay/*" element={<MutltiRoute />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="loading" element={<OpenApp />} />
          <Route path="clear" element={<ClearPage />} />
          <Route path="failed" element={<FailedPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
