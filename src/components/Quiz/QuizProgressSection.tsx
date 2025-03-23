import ProgressBar from "../ProgressBar";

interface QuizProgressSectionProps {
  progress: number;
}

export default function QuizProgressSection({
  progress,
}: QuizProgressSectionProps) {
  return (
    <div className=" w-full flex justify-center">
      <ProgressBar progress={progress} />
    </div>
  );
}
