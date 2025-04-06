import quiz from "../../assets/icons/quiz.png";
import heart from "../../assets/icons/heart.svg";
interface QuizStatusBarProps {
  life: number;
}

export default function QuizStatusBar({ life }: QuizStatusBarProps) {
  return (
    <div className="w-full max-w-xl flex items-center justify-between px-4 mt-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
        <img className="w-7 h-7" src={quiz} />
        <span>새로운 문제!</span>
      </div>

      <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
        <img className="w-7 h-7" src={heart} />
        <span>{life}</span>
      </div>
    </div>
  );
}
