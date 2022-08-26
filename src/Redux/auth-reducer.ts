import { ResultCodesEnum} from "../api/api.ts";
import {authAPI} from "../api/auth-api.ts";
import { securityAPI } from "../api/security-api.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const SET_USER_DATA = "SN/AUTH/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "SN/AUTH/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string| null,
  isAuth: false,
  captchaURL: null as string | null,
};

type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: actionTypes): initialStateType => {
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

type actionTypes = InferActionsTypes<typeof authActions>

export const authActions = {
  setAuthUserData : (userId: number | null, login: string | null, email:string | null, isAuth: boolean, captchaURL: string | null) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth, captchaURL }
  } as const),
  getCaptchaUrlSuccess : (captchaURL:string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaURL }
  } as const) 
}

// * thunks *
type ThunkType = BaseThunkType<actionTypes>

export const authThunkCreator = (): ThunkType => async (dispatch) => {
  const data = await authAPI
    .getAuth()
    .catch((err: { message: string }) => alert(err.message));
  if (data.resultCode === ResultCodesEnum.Sucess) { 
    //console.log("authThunkCreator");
    dispatch(
      authActions.setAuthUserData(data.data.id, data.data.login, data.data.email, true, null)
    );
  } else if (data.resultCode === ResultCodesEnum.Error) {
    console.log(data.messages);
  }
};

export const loginTC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null,
  setStatus: (arg0: string) => void,
  setSubmitting: (isSubmitting: boolean) => void
): ThunkType => async (dispatch) => {
  const response = await authAPI
    .login(email, password, rememberMe, captcha)
    .catch((err: { message: string }) => {
      alert(err.message);
    });
  if (response.data.resultCode === ResultCodesEnum.Sucess) {
    //console.log("loginThunkCreator");
    dispatch(authThunkCreator());
  } else {
    if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    setStatus(response.data.messages);
    setSubmitting(false);
  }
};

export const logoutTC = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodesEnum.Sucess) {
    //console.log("logoutThunkCreator");
    dispatch(authActions.setAuthUserData(null, null, null, false, null));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptcha();

  const captchaURL = response.data.url;

  dispatch(authActions.getCaptchaUrlSuccess(captchaURL));
};

export default authReducer;
