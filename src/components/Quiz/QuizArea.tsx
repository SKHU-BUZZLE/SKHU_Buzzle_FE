import Quiz from "../../stores/Quiz/quizStore";

interface QuizAreaProps {
  quiz: Quiz;
  onOptionClick: (option: string) => void;
  isDisabled?: boolean; // 선택이 완료되어 비활성화할지 여부
}

export default function QuizArea({
  quiz,
  onOptionClick,
  isDisabled,
}: QuizAreaProps) {
  return (
    <div
      className={`w-full mt-4 max-w-xl ${
        isDisabled ? "pointer-events-none" : ""
      }`}
    >
      <div className="w-full bg-white p-5 rounded-lg">
        <div className="flex justify-center text-2xl text-gray-600 font-bold mb-6">
          {quiz.question}
        </div>
        <div className="flex flex-col gap-4">
          {[quiz.option1, quiz.option2, quiz.option3, quiz.option4].map(
            (option, idx) => {
              // isDisabled일 때 정답 버튼에만 추가 border 표시
              const isCorrectOption =
                isDisabled && String(idx + 1) === quiz.answer;
              return (
                <button
                  key={idx}
                  onClick={() => onOptionClick(String(idx + 1))}
                  className={`group p-4 bg-gray-100 rounded border-4 hover:border-[#00F224] hover:bg-gray-200 ${
                    isCorrectOption ? "border-[#00F224]" : ""
                  }`}
                >
                  <span className="font-bold text-xl text-gray-600 group-hover:text-[#00F224]">
                    {option}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
