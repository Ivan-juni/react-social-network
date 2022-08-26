import { userType } from "../types/types";
import { ResponseType } from "./api.ts";
import { GetItemsType, instance } from "./api.ts"

type UsersType = {
  items: Array<userType>
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5, term: string = "", friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
      .then((response: GetItemsType) => response.data);
  },
  getFriends(){
    return instance.get<UsersType>('users?friend=true');
  },
  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then((response: ResponseType) => response.data);
  },
  unfollow(id: number) {
    return instance.delete<ResponseType>(`follow/${id}`).then((response: ResponseType) => response.data);
  },
};