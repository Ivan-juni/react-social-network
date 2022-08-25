import axios from "axios";
import { userType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": `${process.env.REACT_APP_API_KEY}`, // ! вставить сюда api key
  },
});

export type GetItemsType = {
  items: Array<userType>
  totalCount: number
  error: string | null
}

export enum ResultCodesEnum {
  Sucess = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

export type ResponseType<D = {}> = {
  data: D
  resultCode: ResultCodesEnum
  messages: Array<string>
}

// // ! PLACEHOLDER API QUERIES

// const baseUrl = "https://jsonplaceholder.typicode.com/";

// export const usersAPIPlaceholder = {
//   getUsers(currentPage = 1, pageSize = 5) {
//     return axios
//       .get(baseUrl + `users?_page=${currentPage}&&_limit=${pageSize}`)
//       .then((response) => response.data);
//   },
// };
