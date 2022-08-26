import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunkCreator } from "../../Redux/users-reducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import { FilterType, RootState } from "../../types/types";
import { AppDispatch } from "../../Redux/redux-store";
import { usersActions } from "../../Redux/users-reducer";

const UsersContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const usersPage = useSelector((state: RootState) => state.usersPage);
  
  const currentPageChange = (page: number) => {
    //dispatch(usersActions.updateNewCurrentPage(page));
    dispatch(getUsersThunkCreator(page, usersPage.pageSize, usersPage.filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, usersPage.pageSize, filter));
  } 

  useEffect(() => {
    dispatch(getUsersThunkCreator(usersPage.currentPage, usersPage.pageSize, usersPage.filter));
  }, [usersPage.currentPage]);

  return (
    <>
      {usersPage.isFetching ? (
        <Preloader />
      ) : (
        <Users dispatch={dispatch} usersPage={usersPage} onFilterChanged={onFilterChanged} currentPageChange={currentPageChange}/>
      )}
    </>
  );
};

export default UsersContainer;

