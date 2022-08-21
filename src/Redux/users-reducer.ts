import { usersAPIPlaceholder, usersAPISamurai } from "../api/api";
import {userType} from "../types/types";

const FOLLOW = "users/FOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_USERS_COUNT = "users/SET-USERS-COUNT";
const UPDATE_CURRENT_PAGE = "users/UPDATE-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_NOW = "users/TOGGLE-IS-FOLLOWING-NOW";
const FOLLOWING_NOW_CHECKOUT = "users/FOLLOWING-NOW-CHECKOUT";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 5 as number,
  usersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  isFollowingInProgress: [] as Array<number>, // array of user's id
  followingNow: [] as Array<userType>,
};

export type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
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

type followActionType = {
  type: typeof FOLLOW
  userId: number
}
export const follow = (userId: number): followActionType => ({type: FOLLOW, userId});

type setUsersActionType = {
   type: typeof SET_USERS
    users: userType
}
export const setUsers = (users: userType): setUsersActionType => ({type: SET_USERS, users}); // users from server

type followingNowActionType = {
  type: typeof FOLLOWING_NOW_CHECKOUT
}
export const followingNowAC = (): followingNowActionType => ({type: FOLLOWING_NOW_CHECKOUT });

type setUsersCountActionType = {
  type: typeof SET_USERS_COUNT
  usersCount: number
}
export const setUsersCount = (usersCount: number): setUsersCountActionType => ({type: SET_USERS_COUNT, usersCount });

type updateNewCurrentPageActionType = {
  type: typeof UPDATE_CURRENT_PAGE
  page: number
}
export const updateNewCurrentPage = (page: number): updateNewCurrentPageActionType => ({type: UPDATE_CURRENT_PAGE, page });

type toggleIsFetchingAction = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
} 
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingAction => ({type: TOGGLE_IS_FETCHING, isFetching });

type toggleIsFollowingInProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_NOW
  isFetching: boolean
  userId: number
}
export const toggleIsFollowingInProgress = (isFetching: boolean, userId: number): toggleIsFollowingInProgressActionType => {
  return { type: TOGGLE_IS_FOLLOWING_NOW, isFetching, userId };
};

// * thunks *
export const getUsersThunkCreator = (currentPage = 1, pageSize = 5) => async (
  dispatch: any
) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPISamurai.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsersCount(data.totalCount));
  dispatch(setUsers(data.items));
  dispatch(followingNowAC());
};

export const followThunkCreator = (userId: number) => async (dispatch: any) => {
  dispatch(toggleIsFollowingInProgress(true, userId));

  const response = await usersAPISamurai.follow(userId);

  if (response.data.resultCode === 0) {
    dispatch(follow(userId));
    //dispatch(followingNowAC());
  }
  dispatch(toggleIsFollowingInProgress(false, userId));
};

export const unFollowThunkCreator = (userId: number) => async (dispatch: any) => {
  dispatch(toggleIsFollowingInProgress(true, userId));

  const response = await usersAPISamurai.unfollow(userId);

  if (response.data.resultCode === 0) {
    dispatch(follow(userId));
    //dispatch(followingNowAC());
  }
  dispatch(toggleIsFollowingInProgress(false, userId));
};

export default usersReducer;
