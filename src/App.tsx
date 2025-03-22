import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/Login";
import OpenApp from "./pages/loading/OpenApp";
import PrivateRoute from "./routes/PrivateRoute";
import OAuthCallback from "./pages/OAuthCallback";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route path="/loading" element={<OpenApp />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/api/oauth2/callback/kakao"
            element={<OAuthCallback />}
          />
          <Route path="game" element={<div />} />
        </Route>
      </Routes>
    </>
  );
}
