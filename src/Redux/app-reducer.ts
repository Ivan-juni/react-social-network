import { Dispatch } from "redux";
import { authThunkCreator } from "./auth-reducer.ts";
import { InferActionsTypes } from "./redux-store";
//import { getUsersThunkCreator } from "./users-reducer";

const INITIALIZED = "SN/APP/SET_INITIALIZED";

let initialState = {
  initialized: false
}

export type initialStateType = typeof initialState;

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

type actionTypes = InferActionsTypes<typeof appActions>

export const appActions = {
  setInitialized : ()=> ({ type: INITIALIZED } as const),
}

// * thunks *
type DispatchType = Dispatch<actionTypes>

export const initializeAppTC = () => {
  return (dispatch: DispatchType) => {
    let promise = dispatch(authThunkCreator());

    Promise.all([promise]).then(() => {
      dispatch(appActions.setInitialized());
    });
  };
};

export default appReducer;
