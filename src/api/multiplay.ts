import { axiosInstance } from ".";

export const startMatching = () => {
  console.log("매칭시작");
  return axiosInstance.post("/match/v2");
};
