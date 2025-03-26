import { axiosInstance } from ".";

export const startMatching = () => {
  return axiosInstance.post("/match/v2");
};
