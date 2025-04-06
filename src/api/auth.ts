import { axiosInstance } from "./index";

// 카카오 인가코드로 idToken 받아오기
export const getKakaoIdToken = (code: string) => {
  return axiosInstance.get("/oauth2/callback/kakao", {
    params: { code },
  });
};

// idToken으로 access/refresh 토큰 받기
export const postKakaoToken = (authCode: string) => {
  return axiosInstance.post("/kakao/token", {
    authCode,
  });
};

//refreshToken으로 accessToken 재발급 받기
export const refreshAccessToken = (refreshToken: string) => {
  return axiosInstance.post("/token/access", {
    refreshToken,
  });
};
