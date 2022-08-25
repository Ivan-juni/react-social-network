import { ResponseType } from "./api.ts";
import { GetItemsType, instance } from "./api.ts"

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response: GetItemsType) => response.data);
  },
  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then((response: ResponseType) => response.data);
  },
  unfollow(id: number) {
    return instance.delete<ResponseType>(`follow/${id}`).then((response: ResponseType) => response.data);
  },
};