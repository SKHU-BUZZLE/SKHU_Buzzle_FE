import { axiosInstance } from ".";

export const startMatching = () => {

  return axiosInstance.post("/match/v2");
};

export const cancelMatching = () => {

  return axiosInstance.post("/match/cancel/v2");
};
