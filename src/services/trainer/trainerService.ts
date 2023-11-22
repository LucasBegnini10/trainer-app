import api from "../api";

export const createTrainerService = async (email: string, token: string) => {
  return await api
    .post(
      "/trainers/create",
      { email },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const createTrainerStudentAssign = async (studentEmail: string) => {
  return await api
    .post("/trainers/assign", { email: studentEmail })
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const getStudentsByTrainerId = async (trainerId : string) => {
  return await api
  .get(`/trainers/${trainerId}/students/`)
  .then((res) => res)
  .catch((err) => {
    throw err?.response || err;
  });
} 