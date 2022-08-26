import React from "react";
import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {FilterType, usersPageType} from "../../types/types"
import UsersForm from "./Form/UsersForm.tsx";
import { AppDispatch } from "../../Redux/redux-store";

type PropsType = {
  usersPage: usersPageType
  dispatch: AppDispatch
  onFilterChanged: (filter: FilterType) => void
  currentPageChange: (page: number) => void
}

const Users: React.FC<PropsType> = ({ dispatch, usersPage, onFilterChanged, currentPageChange }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchForm}>
        <UsersForm dispatch={dispatch} onFilterChanged={onFilterChanged}/>
      </div>
      <div className={styles.paginator}>
        <Paginator usersPage={usersPage} dispatch={dispatch} currentPageChange={currentPageChange}/>
      </div>
      <div className={styles.users}>
        {usersPage.users.map((u) => (
          <User user={u} usersPage={usersPage} dispatch={dispatch} key={u.id} />
        ))}
      </div>
    </div>
  );
};

export default Users;
