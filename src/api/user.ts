import { axiosInstance } from "./index";

export interface MyPageResponse {
  picture: string;
  email: string;
  name: string;
  streak: number;
}

export interface UserLifeResponse {
  life: number;
}
// 내 정보 조회
export const getMyPage = () => {
  return axiosInstance.get("/members/my-page");
};
// 생명 수 조회
export const getUserLife = () => {
  return axiosInstance.get("/members/life");
};
