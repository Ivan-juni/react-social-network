import React from "react";
import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({ dispatch, usersPage }) => {
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
