import { usersAPIPlaceholder, usersAPISamurai } from "../api/api";

const FOLLOW = "users/FOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_USERS_COUNT = "users/SET-USERS-COUNT";
const UPDATE_CURRENT_PAGE = "users/UPDATE-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_NOW = "users/TOGGLE-IS-FOLLOWING-NOW";
const FOLLOWING_NOW_CHECKOUT = "users/FOLLOWING-NOW-CHECKOUT";

let initialState = {
  users: [],
  pageSize: 5,
  usersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
  followingNow: [],
};

const usersReducer = (state = initialState, action) => {
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

export const follow = (userId) => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};
export const setUsers = (users) => {
  // users from server
  return { type: SET_USERS, users: users };
};
export const followingNowAC = () => {
  return { type: FOLLOWING_NOW_CHECKOUT };
};
export const setUsersCount = (usersCount) => {
  return { type: SET_USERS_COUNT, usersCount };
};
export const updateNewCurrentPage = (page) => {
  return { type: UPDATE_CURRENT_PAGE, page: page };
};
export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
};
export const toggleIsFollowingInProgress = (isFetching, userId) => {
  return { type: TOGGLE_IS_FOLLOWING_NOW, isFetching, userId };
};

// * thunks *
export const getUsersThunkCreator = (currentPage = 1, pageSize = 5) => async (
  dispatch
) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPISamurai.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsersCount(data.totalCount));
  dispatch(setUsers(data.items));
  dispatch(followingNowAC());
};

export const followThunkCreator = (userId) => async (dispatch) => {
  dispatch(toggleIsFollowingInProgress(true, userId));

  const response = await usersAPISamurai.follow(userId);

  if (response.data.resultCode === 0) {
    //console.log("resultCode:", response.data.resultCode);
    dispatch(follow(userId));
    //dispatch(followingNowAC());
  }
  // else {
  //   console.log("resultCode:", response.data.resultCode);
  // }
  dispatch(toggleIsFollowingInProgress(false, userId));
};

export const unFollowThunkCreator = (userId) => async (dispatch) => {
  dispatch(toggleIsFollowingInProgress(true, userId));

  const response = await usersAPISamurai.unfollow(userId);

  if (response.data.resultCode === 0) {
    //console.log("resultCode:", response.data.resultCode);
    dispatch(follow(userId));
    //dispatch(followingNowAC());
  }
  // else {
  //   console.log("resultCode:", response.data.resultCode);
  // }
  dispatch(toggleIsFollowingInProgress(false, userId));
};

export default usersReducer;
