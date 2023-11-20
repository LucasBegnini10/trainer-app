import api from "../api";

export const createTrainerService = async (email: string, token: string) => {
  return await api
    .post("/trainers/create", email, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};
