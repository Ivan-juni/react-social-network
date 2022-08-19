import { authThunkCreator } from "./auth-reducer";
import { getUsersThunkCreator } from "./users-reducer";

const INITIALIZED = "app/SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const setInitialized = () => ({ type: INITIALIZED });

// * thunks *
export const initializeAppTC = () => {
  return (dispatch) => {
    let promise = dispatch(authThunkCreator());

    Promise.all([promise]).then(() => {
      dispatch(setInitialized());
    });
  };
};

export default appReducer;
