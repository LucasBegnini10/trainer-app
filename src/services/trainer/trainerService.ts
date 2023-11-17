import api from "../api";

export const createTrainerService = async (email: string) => {
  return await api
    .post("/trainers/create", email)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};
