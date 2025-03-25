import React from "react";
import ProfileImage from "../assets/images/profile.png";

export default function MyPage() {
  const userName = "허남규";
  const userEmail = "itzvckaya@gmail.com";
  const joinDate = "2025.03 가입";
  const wins = 10;
  const losses = 9;

  return (
    <div className="w-full   min-h-screen flex flex-col items-center border border-gray-200">
      <div className="bg-[#CCD7DD] w-full h-[35%] flex items-center justify-center">
        <img src={ProfileImage} className="h-full" />
      </div>

      <div className="flex w-full flex-col  mt-4 px-4">
        <div className="flex  gap-2 text-xl font-bold">
          {userName} 님<span className="text-blue-600 text-xl">♟️</span>
        </div>
        <div className="text-sm text-gray-500">
          {userEmail} - {joinDate}
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

      {/* 로그아웃 버튼 */}
      <div className="mt-6 px-4 w-full">
        <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-bold border border-gray-300 hover:bg-gray-300 transition">
          로그아웃
        </button>
      </div>
    </div>
  );
}
