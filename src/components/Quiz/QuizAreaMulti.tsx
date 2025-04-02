interface QuizAreaMultiProps {
  quiz: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  };
  onOptionClick: (option: string) => void;
  isDisabled?: boolean;
  isLocked?: boolean;
}

export default function QuizAreaMulti({
  quiz,
  onOptionClick,
  isDisabled,
  isLocked,
}: QuizAreaMultiProps) {
  return (
    <div
      className={`w-full mt-4 max-w-xl ${
        isDisabled || isLocked ? "pointer-events-none" : ""
      }`}
    >
      <div className="w-full bg-white p-5 rounded-lg">
        <div className="flex justify-center text-2xl text-gray-600 font-bold mb-6">
          {quiz.question}
        </div>
        <div className="flex flex-col gap-4">
          {[quiz.option1, quiz.option2, quiz.option3, quiz.option4].map(
            (option, idx) => (
              <button
                key={idx}
                onClick={() => onOptionClick(String(idx + 1))}
                className="group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200"
              >
                <span className="font-bold text-xl text-gray-600 group-hover:text-[#00F224]">
                  {option}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
