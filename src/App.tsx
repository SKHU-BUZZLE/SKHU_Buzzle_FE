import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/Login";
import OpenApp from "./pages/loading/OpenApp";

export default function App() {
  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route path="/loading" element={<OpenApp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="game" element={<div />} />
        </Route>
      </Routes>
    </>
  );
}
