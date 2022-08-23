import { ThunkAction } from "redux-thunk";
import { profileAPISamurai } from "../api/api";
import {postType, profileType, photosType, RootState} from "../types/types";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const DELETE_POST = "profile/DELETE-POST";
const SET_PHOTO = "profile/SET-PHOTO";

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

type actionTypes = addPostActionType | setUserProfileActionType | setStatusActionType | setPhotoSuccessActionType | deletePostActionType;

type addPostActionType = {
  type: typeof ADD_POST
  post: string
}
export const addPostActionCreator = (post: string):addPostActionType => ({
  type: ADD_POST,
  post,
});

type setUserProfileActionType ={
  type: typeof SET_USER_PROFILE
  profile: profileType
}
export const setUserProfile = (profile: profileType):setUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type setStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatusAC = (status: string):setStatusActionType => {
  return { type: SET_STATUS, status };
};

type setPhotoSuccessActionType = {
  type: typeof SET_PHOTO
  photo: photosType
}
export const setPhotoSuccessAC = (photo: photosType):setPhotoSuccessActionType => {
  return { type: SET_PHOTO, photo };
};

type deletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePostAC = (postId: number):deletePostActionType => {
  return { type: DELETE_POST, postId };
};

// * thunks *
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, actionTypes>

export const profileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPISamurai.getProfile(userId);

  dispatch(setUserProfile(data));
};
export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPISamurai.getStatus(userId);

  dispatch(setStatusAC(response.data));
};

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPISamurai.updateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatusAC(status));
  } 
  // else {
  //   alert("Error: result code: ", response.data.resultCode);
  // }
};

export const setPhoto = (photo: File): ThunkType => async (dispatch) => {
  const response = await profileAPISamurai.setPhoto(photo);

  if (response.data.resultCode === 0) {
    dispatch(setPhotoSuccessAC(response.data.data.photos));
  } 
  // else {
  //   alert("Error: result code: ", response.data.resultCode);
  // }
};
export const saveProfile = (profile: profileType, setStatus: (arg0: boolean) => void, setSubmitting: (arg0: boolean) => void): ThunkType => async (
  dispatch,
  getState
) => {
  const response = await profileAPISamurai.saveProfile(profile);

  if (response.data.resultCode === 0) {
    const userId = getState().auth.userId;
    if (userId != null) {
      dispatch(profileThunkCreator(userId));
    }
    else {
      throw new Error("userId can't be null")
    }
  } else {
    setStatus(response.data.messages);
    setSubmitting(false);
  }
};

export default profileReducer;
