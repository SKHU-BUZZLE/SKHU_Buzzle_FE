import { axiosInstance } from ".";

export const startMatching = () => {
  console.log("매칭시작");
  return axiosInstance.post("/match/v2");
};

export const cancelMatching = () => {
  console.log("매칭 이탈");
  return axiosInstance.post("/match/cancel/v2");
};
