import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getKakaoIdToken, postKakaoToken } from "../api/auth";
import { useAuthStore } from "../stores/authStore";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      getKakaoIdToken(code)
        .then((res) => {
          const idToken = res.data.idToken;
          // console.log("idToken:", idToken);
          return postKakaoToken(idToken);
        })
        .then((res) => {
          const { accessToken } = res.data.data;
          // console.log("accessToken:", accessToken);
          // console.log("refreshToken:", refreshToken); // 나중에 리프레쉬 토큰 관리
          setAccessToken(accessToken);
          navigate("/");
        })
        .catch((err) => {
          console.error("로그인 실패:", err);
        });
    }
  }, [location.search, navigate, setAccessToken]);

  return <div className="text-center mt-10">로그인 처리 중입니다...</div>;
}
