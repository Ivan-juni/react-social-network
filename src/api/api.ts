import axios from "axios";
import { photosType, profileType } from "../types/types";

// ! SAMURAI API QUERIES

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": `${process.env.REACT_APP_API_KEY}`, // ! вставить сюда api key
  },
});

// usersAPI
type getUsersResponse = {
  items: {
    id: number
    name: string
    status: string | null
    photos: photosType
    followed: boolean
  }
  totalCount: number
  error: string | null
}

export const usersAPISamurai = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get<getUsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance.post(`follow/${id}`); //.then((response) => response.data);
  },
  unfollow(id: number) {
    return instance.delete(`follow/${id}`); //.then((response) => response.data);
  },
};

// authAPI
export enum ResultCodesEnum {
  Sucess = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type getAuthResponseType = {
  data: {id: number, email: string, login: string}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type loginResponseType = {
  data: {userId: number}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const authAPISamurai = {
  async getAuth() {
    const response = await instance.get<getAuthResponseType>(`auth/me`);
    return response.data;
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<loginResponseType>("auth/login", {
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

// securityAPI
export const securityAPI = {
  getCaptcha() {
    return instance.get<{url: string}>("security/get-captcha-url");
  },
};

// profileAPI
export const profileAPISamurai = {
  getProfile(userId: number) {
    return instance.get<profileType>(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, { status: status });
  },
  setPhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  saveProfile(profile: profileType) {
    return instance.put<profileType>(`profile/`, profile);
  },
};

// // ! PLACEHOLDER API QUERIES

// const baseUrl = "https://jsonplaceholder.typicode.com/";

// export const usersAPIPlaceholder = {
//   getUsers(currentPage = 1, pageSize = 5) {
//     return axios
//       .get(baseUrl + `users?_page=${currentPage}&&_limit=${pageSize}`)
//       .then((response) => response.data);
//   },
// };
