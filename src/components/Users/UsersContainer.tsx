import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunkCreator } from "../../Redux/users-reducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import { RootState } from "../../types/types";
import { AppDispatch } from "../../Redux/redux-store";

const UsersContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const usersPage = useSelector((state: RootState) => state.usersPage);
  
  useEffect(() => {
    dispatch(getUsersThunkCreator(usersPage.currentPage, usersPage.pageSize));
  }, [usersPage.currentPage]);

  return (
    <>
      {usersPage.isFetching ? (
        <Preloader />
      ) : (
        <Users dispatch={dispatch} usersPage={usersPage} />
      )}
    </>
  );
};

export default UsersContainer;

