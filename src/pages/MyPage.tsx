import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileImage from "../assets/images/profile.png";
import { useAuthStore } from "../stores/authStore";
import { getMyPage } from "../api/user";

interface MyInfo {
  picture: string;
  email: string;
  name: string;
  streak: number;
  createAt: string;
}

export default function MyPage() {
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<MyInfo | null>(null);

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const getDaysSinceJoin = (dateString: string) => {
    const now = new Date();
    const joined = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - joined.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const getLevel = (streak: number) => {
    if (streak >= 300) return "🏆 레전드";
    if (streak >= 200) return "🥈 마스터";
    if (streak >= 100) return "🥉 루키";
    return "🌱 새싹";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMyPage();
        setUser(res.data.data);
      } catch (err) {
        console.error("내 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-50 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 상단 프로필 영역 */}
      <motion.div
        className="w-full h-[35%] bg-gradient-to-r from-[#C6DCE4] to-[#E2EBF0] flex items-center justify-center shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-full overflow-hidden w-32 h-32 border-4 border-white shadow-xl bg-white"
        >
          <img
            src={user.picture || ProfileImage}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </motion.div>

      {/* 사용자 정보 */}
      <motion.div
        className="w-full text-center mt-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center gap-2">
          {user.name}님 <span className="text-blue-600 text-2xl">♟️</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {user.email} · {formatDate(user.createAt)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          가입 후 {getDaysSinceJoin(user.createAt)}일째 활동 중
        </p>
      </motion.div>

      {/* 활동 정보 */}
      <motion.div
        className="mt-6 w-full px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-white border border-gray-300 rounded-xl p-4 text-center shadow-sm space-y-1">
          <p className="text-base font-semibold text-indigo-600">
            🔥 활동 점수: {user.streak}점
          </p>
          <p className="text-sm font-semibold text-gray-600">
            🏅 현재 등급: {getLevel(user.streak)}
          </p>
        </div>
      </motion.div>

      {/* 로그아웃 버튼 */}
      <motion.div
        className="mt-8 px-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold shadow-sm hover:bg-gray-100 transition"
        >
          로그아웃
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
