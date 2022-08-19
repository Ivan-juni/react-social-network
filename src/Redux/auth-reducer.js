import { authAPISamurai, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email, isAuth, captchaURL) => ({
  type: SET_USER_DATA,
  payload: { userId, login, email, isAuth, captchaURL },
});
export const getCaptchaUrlSuccess = (captchaURL) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
});

// * thunks *
export const authThunkCreator = () => async (dispatch) => {
  const data = await authAPISamurai
    .getAuth()
    .catch((err) => alert(err.message));
  if (data.resultCode === 0) {
    //console.log("authThunkCreator");
    dispatch(
      setAuthUserData(data.data.id, data.data.login, data.data.email, true)
    );
  } else if (data.resultCode === 1) {
    console.log(data.messages);
  }
};

export const loginTC = (
  email,
  password,
  rememberMe,
  captcha,
  setStatus,
  setSubmitting
) => async (dispatch) => {
  const response = await authAPISamurai
    .login(email, password, rememberMe, captcha)
    .catch((err) => {
      alert(err.message);
    });
  if (response.data.resultCode === 0) {
    //console.log("loginThunkCreator");
    dispatch(authThunkCreator());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    setStatus(response.data.messages);
    setSubmitting(false);
  }
};

export const logoutTC = () => async (dispatch) => {
  const response = await authAPISamurai.logout();

  if (response.data.resultCode === 0) {
    //console.log("logoutThunkCreator");
    dispatch(setAuthUserData(null, null, null, false, null));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha();

  const captchaURL = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaURL));
};

export default authReducer;
