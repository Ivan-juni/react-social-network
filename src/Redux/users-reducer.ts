import { ResultCodesEnum } from "../api/api.ts";
import { usersAPI } from "../api/users-api.ts";
import { userType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const FOLLOW = "SN/USERS/FOLLOW";
const SET_USERS = "SN/USERS/SET-USERS";
const SET_USERS_COUNT = "SN/USERS/SET-USERS-COUNT";
const UPDATE_CURRENT_PAGE = "SN/USERS/UPDATE-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "SN/USERS/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_NOW = "SN/USERS/TOGGLE-IS-FOLLOWING-NOW";
const FOLLOWING_NOW_CHECKOUT = "SN/USERS/FOLLOWING-NOW-CHECKOUT";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 5 as number,
  usersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  isFollowingInProgress: [] as Array<number>, // array of user's id
  followingNow: [] as Array<userType>,
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: actionTypes): initialStateType  => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: !u.followed };
          }
          return u;
        }),
      };
    case FOLLOWING_NOW_CHECKOUT:
      let followedUsers = state.users.filter((u) => u.followed === true);

      console.log(followedUsers, "followedUsers");
      console.log(state.followingNow, "followingNow");
      return {
        ...state,
        followingNow: [...followedUsers],
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_USERS_COUNT:
      return { ...state, usersCount: action.usersCount };
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_NOW:
      return {
        ...state,
        isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id != action.userId),
      };
    default:
      return state;
  }
};

type actionTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
  follow : (userId: number) => ({type: FOLLOW, userId} as const),
  setUsers : (users: Array<userType>) => ({type: SET_USERS, users} as const), // users from server
  followingNowAC : ()=> ({type: FOLLOWING_NOW_CHECKOUT } as const),
  setUsersCount : (usersCount: number) => ({type: SET_USERS_COUNT, usersCount } as const),
  updateNewCurrentPage : (page: number) => ({type: UPDATE_CURRENT_PAGE, page } as const),
  toggleIsFetching : (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching } as const),
  toggleIsFollowingInProgress : (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_NOW, isFetching, userId } as const),
}

// * thunks *
type ThunkType = BaseThunkType<actionTypes>
// type DispatchType = Dispatch<actionTypes>
// type GetStateType = () => RootState

export const getUsersThunkCreator = (currentPage = 1, pageSize = 5): ThunkType  => async (
  dispatch
) => {
  dispatch(usersActions.toggleIsFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(usersActions.toggleIsFetching(false));
  dispatch(usersActions.setUsersCount(data.totalCount));
  dispatch(usersActions.setUsers(data.items));
  dispatch(usersActions.followingNowAC());
};

export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFollowingInProgress(true, userId));

  const data = await usersAPI.follow(userId);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(usersActions.follow(userId));
    //dispatch(followingNowAC());  
  }
  dispatch(usersActions.toggleIsFollowingInProgress(false, userId));
};

export const unFollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFollowingInProgress(true, userId));

  const data = await usersAPI.unfollow(userId);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(usersActions.follow(userId));
    //dispatch(followingNowAC());
  }
  dispatch(usersActions.toggleIsFollowingInProgress(false, userId));
};

export default usersReducer;
