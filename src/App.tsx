import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/Login";
import OpenApp from "./pages/loading/OpenApp";
import PrivateRoute from "./routes/PrivateRoute";
import OAuthCallback from "./pages/OAuthCallback";
import { SinglePlay } from "./pages/SinglePlay";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="loading" element={<OpenApp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="api/oauth2/callback/kakao" element={<OAuthCallback />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="singlePlay" element={<SinglePlay />} />
          <Route path="game" element={<div />} />
        </Route>
      </Route>
    </Routes>
  );
}
