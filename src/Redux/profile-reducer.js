import { profileAPISamurai } from "../api/api";

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
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
        profile: { ...state.profile, photos: action.photo },
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

export const addPostActionCreator = (post) => ({
  type: ADD_POST,
  post,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatusAC = (status) => {
  return { type: SET_STATUS, status };
};
export const setPhotoSuccessAC = (photo) => {
  return { type: SET_PHOTO, photo };
};
export const deletePostAC = (postId) => {
  return { type: DELETE_POST, postId };
};

// * thunks *

export const profileThunkCreator = (userId) => async (dispatch) => {
  const data = await profileAPISamurai.getProfile(userId);

  dispatch(setUserProfile(data));
};
export const getStatusThunkCreator = (userId) => async (dispatch) => {
  const response = await profileAPISamurai.getStatus(userId);

  dispatch(setStatusAC(response.data));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
  const response = await profileAPISamurai.updateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatusAC(status));
  } else {
    alert("Error: result code: ", response.data.resultCode);
  }
};

export const setPhoto = (photo) => async (dispatch) => {
  const response = await profileAPISamurai.setPhoto(photo);

  if (response.data.resultCode === 0) {
    dispatch(setPhotoSuccessAC(response.data.data.photos));
  } else {
    alert("Error: result code: ", response.data.resultCode);
  }
};
export const saveProfile = (profile, setStatus, setSubmitting) => async (
  dispatch,
  getState
) => {
  const response = await profileAPISamurai.saveProfile(profile);

  if (response.data.resultCode === 0) {
    const userId = getState().auth.userId;

    dispatch(profileThunkCreator(userId));
  } else {
    setStatus(response.data.messages);
    setSubmitting(false);
  }
};

export default profileReducer;
