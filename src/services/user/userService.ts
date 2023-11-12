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

export const recoveryPassword = async (email: string) => {
  return await api
    .post(`/auth/recovery-password/`, email)
    .then((res) => res?.data || res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const updatePassword = async (bodyUpdatePassword: {
  email: string;
  actualPassword: string;
  newPassword: string;
}) => {
  return await api
    .post(
      `users/${bodyUpdatePassword.email}/change-password`,
      bodyUpdatePassword
    )
    .then((res) => res?.data || res)
    .catch((err) => {
      throw err?.response || err;
    });
};
