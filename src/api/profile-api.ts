import { photosType, profileType } from "../types/types";
import { ResponseType } from "./api";
import { instance } from "./api.ts";

// profileAPI
export const profileAPI= {
  getProfile(userId: number) {
    return instance.get<profileType>(`profile/${userId}`).then((response: ResponseType<profileType>) => response.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then((response: ResponseType<string>) => response.data);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>(`profile/status/`, { status: status }).then((response: ResponseType) => response.data);
  },
  setPhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<ResponseType<photosType>>(`profile/photo/`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    }).then((response: ResponseType<photosType>) => response.data);
  },
  saveProfile(profile: profileType) {
    return instance.put<ResponseType>(`profile/`, profile).then((response: ResponseType) => response.data);
  },
};