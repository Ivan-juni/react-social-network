import { authThunkCreator } from "./auth-reducer.ts";
//import { getUsersThunkCreator } from "./users-reducer";

const INITIALIZED = "app/SET_INITIALIZED";

export type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
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

type setInitializedActionType = {
  type: typeof INITIALIZED
}

export const setInitialized = (): setInitializedActionType => ({ type: INITIALIZED });

// * thunks *
export const initializeAppTC = () => {
  return (dispatch: any) => {
    let promise = dispatch(authThunkCreator());

    Promise.all([promise]).then(() => {
      dispatch(setInitialized());
    });
  };
};

export default appReducer;
