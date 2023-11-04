import api from "../api";

export const createStudentService = async (email: string) => {
  return await api
    .post("/student/create", email)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};
