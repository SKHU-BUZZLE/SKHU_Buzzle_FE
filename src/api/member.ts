import { axiosInstance } from "./index";

//상위 10등 유저 조회
export const getTopRankers = () => {
  return axiosInstance.get("/members/ranking");
};

//특정 회원의 life 조회
export const getMemberLife = () => {
  return axiosInstance.get("/members/life");
};
