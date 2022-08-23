import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../types/types";
import { authThunkCreator } from "./auth-reducer.ts";
//import { getUsersThunkCreator } from "./users-reducer";

const INITIALIZED = "app/SET_INITIALIZED";

export type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: actionTypes): initialStateType => {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type actionTypes = setInitializedActionType;

type setInitializedActionType = {
  type: typeof INITIALIZED
}

export const setInitialized = (): setInitializedActionType => ({ type: INITIALIZED });

// * thunks *
type DispatchType = Dispatch<actionTypes>

export const initializeAppTC = () => {
  return (dispatch: DispatchType) => {
    let promise = dispatch(authThunkCreator());

    Promise.all([promise]).then(() => {
      dispatch(setInitialized());
    });
  };
};

export default appReducer;
