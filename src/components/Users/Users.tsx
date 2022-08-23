import React from "react";
import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {usersPageType} from "../../types/types"

type PropsType = {
  usersPage: usersPageType
  dispatch: any
}

const Users: React.FC<PropsType> = ({ dispatch, usersPage }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.paginator}>
        <Paginator usersPage={usersPage} dispatch={dispatch} />
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
