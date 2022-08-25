import { ResultCodesEnum } from "../api/api.ts";
import { profileAPI } from "../api/profile-api.ts";
import {postType, profileType, photosType, RootState} from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const ADD_POST = "SN/PROFILE/ADD-POST";
const SET_USER_PROFILE = "SN/PROFILE/SET-USER-PROFILE";
const SET_STATUS = "SN/PROFILE/SET-STATUS";
const DELETE_POST = "SN/PROFILE/DELETE-POST";
const SET_PHOTO = "SN/PROFILE/SET-PHOTO";

let initialState = {
  posts: [
    {
      id: 1,
      likes: 12,
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum maiores quaerat sit corporis mollitia, id dolore reprehenderit. Totam, pariatur nisi?",
    },
    { id: 2, likes: 3, text: "Hello, everybody!" },
  ] as Array<postType>,
  profile: null as profileType | null,
  status: "" as string,
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: actionTypes):initialStateType => {
  switch (action.type) {
    case ADD_POST:
      let id = state.posts.length + 1;
      let newPost = {
        id: id,
        likes: 0,
        text: action.post,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photo } as profileType,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    default:
      return state;
  }
};

type actionTypes = InferActionsTypes<typeof profileActions>;

export const profileActions = {
  addPostActionCreator : (post: string) => ({type: ADD_POST, post} as const),
  setUserProfile : (profile: profileType) => ({type: SET_USER_PROFILE, profile} as const),
  setStatusAC : (status: string) => ({ type: SET_STATUS, status } as const),
  setPhotoSuccessAC : (photo: photosType) => ({type: SET_PHOTO, photo } as const),
  deletePostAC : (postId: number)=> ({type: DELETE_POST, postId } as const),
}

// * thunks *
type ThunkType = BaseThunkType<actionTypes>

export const profileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);

  dispatch(profileActions.setUserProfile(data));
};

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);

  dispatch(profileActions.setStatusAC(data));
};

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(profileActions.setStatusAC(status));
  } 
};

export const setPhoto = (photo: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.setPhoto(photo);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(profileActions.setPhotoSuccessAC(data.data.photos));
  } 
};

export const saveProfile = (profile: profileType, setStatus: (arg0: string) => void, setSubmitting: (arg0: boolean) => void): ThunkType => async (
  dispatch,
  getState
) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    const userId = getState().auth.userId;
    if (userId != null) {
      dispatch(profileThunkCreator(userId));
    }
    else {
      throw new Error("userId can't be null")
    }
  } else {
    setStatus(data.messages);
    setSubmitting(false);
  }
};

export default profileReducer;
