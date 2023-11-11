import api from "../api";

export const getUser = async (id: string) => {
  return await api
    .get(`/users/${id}`)
    .then((res) => res?.data || res)
    .catch((err) => {
      throw err?.response || err;
    });
};

interface IUpdateUser {
  document: string;
  name: string;
  email: string;
}

export const updateUserSerice = async (userUpdate: IUpdateUser) => {
  return await api
    .patch(`/users/${userUpdate.email}`)
    .then((res) => res?.data || res)
    .catch((err) => {
      throw err?.response || err;
    });
};
