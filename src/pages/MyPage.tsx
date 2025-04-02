import { useEffect, useState } from "react";
import { getTopRankers } from "../api/member";
import ProfileImage from "../assets/images/profile.png";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

export default function MyPage() {
  const { user, fetchUser } = useUserStore();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const joinDate = "2025.03 가입";
  const wins = 10;
  const losses = 10; // 예시: 10번 승리/패배

  // 랭킹 데이터를 저장할 상태 추가
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    fetchUser();
    getTopRankers()
      .then((res) => {
        console.log("getTopRankers response:", res.data);
        // 응답이 res.data.data.memberInfoResDtos 형태인지 확인
        if (res.data && res.data.data && res.data.data.memberInfoResDtos) {
          setRanking(res.data.data.memberInfoResDtos);
        } else if (res.data && res.data.memberInfoResDtos) {
          // 만약 바로 res.data.memberInfoResDtos에 있다면
          setRanking(res.data.memberInfoResDtos);
        } else {
          console.warn("랭킹 데이터를 찾을 수 없습니다.", res.data);
        }
      })
      .catch((error) => {
        console.error("getTopRankers error:", error);
      });
  }, []);

  const handleLogout = () => {
    clearAccessToken();
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center border border-gray-200">
      {/* 상단 프로필 영역 */}
      <div className="bg-[#CCD7DD] w-full h-[35%] flex items-center justify-center">
        <img
          src={user?.picture ?? ProfileImage}
          className="h-full"
          alt="profile"
        />
      </div>

      {/* 사용자 정보 */}
      <div className="flex w-full flex-col mt-4 px-4">
        <div className="flex gap-2 text-xl font-bold">
          {user?.name}님<span className="text-blue-600 text-xl">♟️</span>
        </div>
        <div className="text-sm text-gray-500">
          {user?.email} - {joinDate}
        </div>
      </div>

      {/* 승리/패배 정보 */}
      <div className="mt-4 w-full flex gap-2 px-4">
        <div className="flex-1 bg-white border border-gray-300 rounded-md flex flex-col items-center py-3">
          <span className="text-sm font-semibold">🏆 {wins}번 승리</span>
        </div>
        <div className="flex-1 bg-white border border-gray-300 rounded-md flex flex-col items-center py-3">
          <span className="text-sm font-semibold">😢 {losses}번 패배</span>
        </div>
      </div>

      {/* 랭킹 TOP 5 */}
      <div className="mt-4 w-full px-4">
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <div className="font-bold text-lg mb-2">TOP 5 랭킹</div>
          <ul className="font-bold  text-gray-600 space-y-1">
            {ranking.slice(0, 5).map((member, idx) => (
              <li className="p-1" key={member.email}>
                {idx + 1}위: {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="mt-6 px-4 w-full">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-bold border border-gray-300 hover:bg-gray-300 transition"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
