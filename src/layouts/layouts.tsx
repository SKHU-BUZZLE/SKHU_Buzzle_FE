import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

function Layout() {
  const location = useLocation();
  // "/game"로 변경해주어야 올바르게 비교됨
  const showNav =
    location.pathname === "/home" ||
    location.pathname === "/main" ||
    location.pathname === "/multiPlay/ready" ||
    location.pathname === "/mypage" ||
    location.pathname === "/ranking";

  const renderBottmNav = () => {
    if (showNav) {
      return <BottomNav />;
    } else {
      return null;
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="relative  max-w-[768px] min-w-[320px] w-full h-screen mx-auto flex flex-col overflow-y-auto font-Sejong"
    >
      <div className="flex-1 flex justify-center w-full">
        <Outlet />
      </div>
      {renderBottmNav()}
    </div>
  );
}

export default Layout;
