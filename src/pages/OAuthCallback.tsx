import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getKakaoIdToken, postKakaoToken } from "../api/auth";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      getKakaoIdToken(code)
        .then((res) => {
          const idToken = res.data.idToken;
          console.log("idToken:", idToken);

          return postKakaoToken(idToken);
        })
        .then((res) => {
          const { accessToken, refreshToken } = res.data.data;
          console.log("accessToken:", accessToken);
          console.log("refreshToken:", refreshToken);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          navigate("/");
        })
        .catch((err) => {
          console.error("로그인 실패:", err);
        });
    }
  }, [location.search, navigate]);

  return <div className="text-center mt-10">로그인 처리 중입니다...</div>;
}
