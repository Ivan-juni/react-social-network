import { ResultCodesEnum } from "../api/api.ts";
import { usersAPI } from "../api/users-api.ts";
import { FilterType, userType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { getFriendsTC } from "./sidebar-reducer";

const FOLLOW = "SN/USERS/FOLLOW";
const SET_USERS = "SN/USERS/SET-USERS";
const SET_USERS_COUNT = "SN/USERS/SET-USERS-COUNT";
const UPDATE_CURRENT_PAGE = "SN/USERS/UPDATE-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "SN/USERS/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_NOW = "SN/USERS/TOGGLE-IS-FOLLOWING-NOW";
const SET_FILTER = "SN/USERS/SET-FILTER";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 5 as number,
  usersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  isFollowingInProgress: [] as Array<number>, // array of user's id
  filter: {
    term: "",
    friend: null 
  } as FilterType
};

export type initialStateType = typeof initialState;

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
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
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
  setUsersCount : (usersCount: number) => ({type: SET_USERS_COUNT, usersCount } as const),
  updateNewCurrentPage : (page: number) => ({type: UPDATE_CURRENT_PAGE, page } as const),
  setFilter : (filter: FilterType) => ({type: SET_FILTER, payload: filter } as const),
  toggleIsFetching : (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching } as const),
  toggleIsFollowingInProgress : (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_NOW, isFetching, userId } as const),
}

// * thunks *
type ThunkType = BaseThunkType<actionTypes>
// type DispatchType = Dispatch<actionTypes>
// type GetStateType = () => RootState

export const getUsersThunkCreator = (currentPage = 1, pageSize = 5, filter: FilterType, setStatus: (arg0: string) => void,
  //setSubmitting: (isSubmitting: boolean) => void
  ): ThunkType  => async (
  dispatch
) => {
  dispatch(usersActions.toggleIsFetching(true));
  dispatch(usersActions.updateNewCurrentPage(currentPage));
  dispatch(usersActions.setFilter(filter));

  const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
  dispatch(usersActions.toggleIsFetching(false));
  dispatch(usersActions.setUsersCount(data.totalCount));
  dispatch(usersActions.setUsers(data.items));
  //setStatus(data.messages);
  // setSubmitting(false);
};

export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFollowingInProgress(true, userId));

  const data = await usersAPI.follow(userId);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(usersActions.follow(userId)); 
  }
  dispatch(getFriendsTC());
  dispatch(usersActions.toggleIsFollowingInProgress(false, userId));
};

export const unFollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFollowingInProgress(true, userId));

  const data = await usersAPI.unfollow(userId);

  if (data.resultCode === ResultCodesEnum.Sucess) {
    dispatch(usersActions.follow(userId));
  }
  dispatch(getFriendsTC());
  dispatch(usersActions.toggleIsFollowingInProgress(false, userId));
};

export default usersReducer;
