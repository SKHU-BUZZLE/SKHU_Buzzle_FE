import { useAuthStore } from "../stores/authStore";

export default function MyPage() {
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const handleLogout = () => {
    clearAccessToken();
    alert("로그아웃");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">마이페이지</h1>
      <button onClick={handleLogout} className="px-4 py-2 border border-black">
        로그아웃
      </button>
    </div>
  );
}
