import api from "../api";

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthSignUp {
  email: string;
  document: string;
  name: string;
  password: string;
}

export const authService = async (auth: IAuth) => {
  return await api
    .post("/auth/signin", auth)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const signUpService = async (account: IAuthSignUp) => {
  return await api
    .post("/auth/signup", account)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

