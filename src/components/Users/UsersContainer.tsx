import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunkCreator } from "../../Redux/users-reducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import { FilterType, RootState } from "../../types/types";
import { AppDispatch } from "../../Redux/redux-store";
import { useSearchParams } from "react-router-dom";

const UsersContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const usersPage = useSelector((state: RootState) => state.usersPage);
  
  const currentPageChange = (page: number) => {
    //dispatch(usersActions.updateNewCurrentPage(page));
    dispatch(getUsersThunkCreator(page, usersPage.pageSize, usersPage.filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, usersPage.pageSize, filter));
  } 

  useEffect(() => {
    const termQuery = searchParams.get('term') || '';
    const friendQuery = (searchParams.get('friend') === "null" || "") ? null : searchParams.get('friend') === "true" ? true : false;
    const pageQuery =  Number((searchParams.get('page')) ? (searchParams.get('page')) : 1);
    
    const actualFilter = {term: termQuery, friend: friendQuery}

    dispatch(getUsersThunkCreator(pageQuery, usersPage.pageSize, actualFilter));
  }, []);

  useEffect(()=>{
    setSearchParams({term: usersPage.filter.term, friend: `${usersPage.filter.friend}`, page: `${usersPage.currentPage}`})
  }, [usersPage.filter, usersPage.currentPage]);


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

