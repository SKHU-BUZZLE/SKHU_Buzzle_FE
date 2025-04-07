import { useNavigate } from "react-router-dom";
import heart from "../assets/icons/heart.svg";
import rank from "../assets/icons/rank.svg";

interface TopStatusBarProps {
  life: number;
}

export default function TopStatusBar({ life }: TopStatusBarProps) {
  const navigate = useNavigate();
  const handleRankingClick = () => {
    navigate("/ranking", { replace: true });
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 w-full">
      <img
        src={rank}
        alt="rank"
        className="w-8 h-8 cursor-pointer"
        onClick={handleRankingClick}
      />
      <div className="flex items-center gap-1">
        <img className="w-7 h-7" src={heart} alt="heart" />
        <span className="font-bold text-lg">{life}</span>
      </div>
    </header>
  );
}
