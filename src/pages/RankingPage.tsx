import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BUZZLE from "../assets/images/BUZZLE1.png";
import { getTopRankers } from "../api/member";

interface MemberInfo {
  picture: string;
  email: string;
  name: string;
  streak: number;
  createAt: string;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<MemberInfo[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await getTopRankers();
        const data = response.data?.data?.memberInfoResDtos || [];
        setRanking(data);
      } catch (error) {
        console.error("랭킹 불러오기 실패:", error);
      }
    };

    fetchRanking();
  }, []);

  const getPodiumColor = (index: number) => {
    return index === 0
      ? "from-yellow-300 to-yellow-100"
      : index === 1
      ? "from-gray-300 to-gray-100"
      : "from-orange-300 to-orange-100";
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const getLevel = (streak: number) => {
    if (streak >= 300) return "🏆 레전드";
    if (streak >= 200) return "🥈 마스터";
    if (streak >= 100) return "🥉 루키";
    return "🌱 새싹";
  };

  return (
    <motion.div
      className="w-full px-2 xs:px-4 py-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 로고 */}
      <div className="flex justify-center pt-4">
        <img
          className="w-full max-w-[250px] xs:max-w-xs pb-10"
          src={BUZZLE}
          alt="BUZZLE"
        />
      </div>

      {/* Top 3 podium */}
      <div className="flex justify-center items-end space-x-2 xs:space-x-6 pb-10 xs:pb-12">
        {ranking.slice(0, 3).map((member, index) => (
          <motion.div
            key={member.email}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.08 }}
            className={`flex flex-col items-center justify-end rounded-2xl p-2 xs:p-4 shadow-xl bg-gradient-to-b ${getPodiumColor(
              index
            )} ${
              index === 0
                ? "w-[90px] h-[180px] xs:w-36 xs:h-60"
                : index === 1
                ? "w-[80px] h-[160px] xs:w-32 xs:h-52"
                : "w-[75px] h-[145px] xs:w-32 xs:h-48"
            }`}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-[10px] xs:text-xl mb-1"
            >
              👑
            </motion.div>
            <img
              src={member.picture}
              alt={member.name}
              className="w-12 h-12 xs:w-16 xs:h-16 rounded-full object-cover border-2 xs:border-4 border-white shadow-md"
            />
            <div className="text-xs xs:text-xs font-semibold mt-1 xs:mt-2 text-gray-800 text-center">
              {member.name}
            </div>
            <div className="text-[10px] xs:text-xs text-gray-500">
              {getLevel(member.streak)}
            </div>
            <div className="text-[10px] xs:text-xs text-gray-600">
              🔥 {member.streak}점
            </div>
            <div className="mt-1 text-[10px] xs:text-xs text-gray-500 font-medium">
              {index + 1}등
            </div>
          </motion.div>
        ))}
      </div>

      {/* 랭킹 리스트 */}
      <ul className="space-y-3 xs:space-y-4">
        {ranking.slice(3).map((member, index) => (
          <motion.li
            key={member.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center bg-white shadow-md rounded-xl px-3 xs:px-4 py-2 xs:py-3 hover:shadow-xl transition-all"
          >
            <span className="text-xs xs:text-lg font-bold w-6 xs:w-10 text-center text-indigo-600">
              {index + 4}
            </span>
            <img
              src={member.picture}
              alt={member.name}
              className="w-10 h-10 xs:w-14 xs:h-14 rounded-full object-cover mx-2 xs:mx-4 border-2 border-indigo-100"
            />
            <div className="flex flex-col">
              <span className="text-xs xs:text-base font-semibold text-gray-800">
                {member.name}
              </span>
              <span className="text-[11px] xs:text-xs text-gray-500">
                {getLevel(member.streak)} · 🔥 {member.streak}점 · 📅{" "}
                {formatDate(member.createAt)}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
