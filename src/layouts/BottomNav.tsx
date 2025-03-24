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
    path: "/game",
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
    <nav className="fixed bottom-padding-nav bottom-0 left-1/2 -translate-x-1/2 z-40 flex max-w-3xl min-w-[320px] w-full bg-secondary-1 py-1 border-t border-black">
      {navItems.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={path}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 p-2 hover:brightness-120 transition"
        >
          <img src={icon} className="block w-8 h-8" alt={`${label} Icon`} />
        </NavLink>
      ))}
    </nav>
  );
}
