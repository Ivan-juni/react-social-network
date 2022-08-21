import { authAPISamurai, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string| null,
  isAuth: false,
  captchaURL: null as string | null,
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
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

type setAuthUserDataActionPayloadType = { userId: number | null, login: string | null, email:string | null, isAuth: boolean, captchaURL: string | null}
type setAuthUserDataActionType = {type: typeof SET_USER_DATA, payload: setAuthUserDataActionPayloadType}

export const setAuthUserData = (userId: number | null, login: string | null, email:string | null, isAuth: boolean, captchaURL: string | null):setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, login, email, isAuth, captchaURL },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: {captchaURL: string}
}

export const getCaptchaUrlSuccess = (captchaURL:string):getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
});

// * thunks *
export const authThunkCreator = () => async (dispatch: any) => {
  const data = await authAPISamurai
    .getAuth()
    .catch((err) => alert(err.message));
  if (data.resultCode === 0) {
    //console.log("authThunkCreator");
    dispatch(
      setAuthUserData(data.data.id, data.data.login, data.data.email, true, null)
    );
  } else if (data.resultCode === 1) {
    console.log(data.messages);
  }
};

export const loginTC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any,
  setStatus: any,
  setSubmitting: any
) => async (dispatch: any) => {
  const response: any = await authAPISamurai
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

export const logoutTC = () => async (dispatch:any) => {
  const response = await authAPISamurai.logout();

  if (response.data.resultCode === 0) {
    //console.log("logoutThunkCreator");
    dispatch(setAuthUserData(null, null, null, false, null));
  }
};

export const getCaptchaUrl = () => async (dispatch:any) => {
  const response = await securityAPI.getCaptcha();

  const captchaURL = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaURL));
};

export default authReducer;
