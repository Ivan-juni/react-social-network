import { instance, ResponseType } from "./api.ts"

// authAPI
type getAuthDataType = {id: number, email: string, login: string}

type loginDataType = {userId: number}

export const authAPI = {
  async getAuth() {
    const response = await instance.get<ResponseType<getAuthDataType>>(`auth/me`);
    return response.data;
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<ResponseType<loginDataType>>("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete("auth/login");
  },
};
