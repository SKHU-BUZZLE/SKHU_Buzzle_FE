import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { inGameState, useMultiMatchStore } from "../stores/multiStore";
import MultiMatching from "../pages/MultiMatching";
import { useEffect } from "react";
import ReadyMatching from "../pages/ReadyMatching";
import MultiPlay from "../pages/MultiPlay";

export default function MultiRoute() {
  const state = useMultiMatchStore((s) => s.state);
  const navigate = useNavigate();

  const getDefaultRoute = () => {
    switch (state) {
      case inGameState.ready:
        return "/multiPlay/ready";
      case inGameState.matching:
        return "/multiPlay/matching";
      case inGameState.ingame:
        return "/multiPlay/ingame";
      default:
        return "/multiPlay/ready";
    }
  };

  // state가 변경될 때마다 기본 경로로 강제 이동
  useEffect(() => {
    navigate(getDefaultRoute(), { replace: true });
  }, [state, navigate]);

  return (
    <Routes>
      <Route path="ready" element={<ReadyMatching />} />
      <Route path="matching" element={<MultiMatching />} />
      <Route path="ingame" element={<MultiPlay />} />
      {/* 그 외 모든 경로는 현재 상태에 따라 리다이렉트 */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}
