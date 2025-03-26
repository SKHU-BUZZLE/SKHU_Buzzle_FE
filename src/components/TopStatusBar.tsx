import heart from "../assets/icons/heart.svg";
import stamp from "../assets/icons/stamp.svg";

interface TopStatusBarProps {
  life: number;
}

export default function TopStatusBar({ life }: TopStatusBarProps) {
  return (
    <div className="w-full px-6 flex justify-between items-center">
      {/* 좌측: 스탬프 아이콘 */}
      <div>
        <img className="w-7 h-7" src={stamp} alt="stamp" />
      </div>

      {/* 우측: 하트 + 수 */}
      <div className="flex items-center gap-1">
        <img className="w-7 h-7" src={heart} alt="heart" />
        <span className="text-lg font-semibold">{life}</span>
      </div>
    </div>
  );
}
