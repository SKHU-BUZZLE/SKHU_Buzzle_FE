import { useAuthStore } from "../stores/authStore";

export default function Home() {
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="">
        <img src="" alt="" />
      </div>
    </div>
  );
}
