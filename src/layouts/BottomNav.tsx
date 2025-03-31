import { NavLink } from "react-router";
import Home from "../assets/icons/home.svg";
import Game from "../assets/icons/game.svg";
import MyPage from "../assets/icons/mypage.svg";

const navItems = [
  {
    path: "/home",
    label: "홈",
    icon: Home,
  },
  {
    path: "/multiPlay",
    label: "게임",
    icon: Game,
  },
  {
    path: "/mypage",
    label: "마이페이지",
    icon: MyPage,
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bg-white bottom-padding-nav bottom-0 left-1/2 -translate-x-1/2 z-40 flex max-w-3xl min-w-[320px] w-full bg-secondary-1 border-t border-gray-200">
      {navItems.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 p-2 transition-colors duration-700 ${
              isActive ? "bg-gray-100" : ""
            }`
          }
        >
          <img src={icon} className="block w-8 h-8" alt={`${label} Icon`} />
        </NavLink>
      ))}
    </nav>
  );
}
