import React from "react";
import styles from "./Users.module.css";
import avatar from "./../../images/ava-icon.jpeg";
import { NavLink } from "react-router-dom";
import {
  followThunkCreator,
  unFollowThunkCreator,
} from "../../Redux/users-reducer.ts";
import { usersPageType, userType } from "../../types/types";

type PropsType = {
  usersPage: usersPageType
  dispatch: any
  user: userType
}

const Users: React.FC<PropsType> = ({ user, dispatch, usersPage }) => {
  return (
    <div className={styles.user}>
      <div className={styles.left_block}>
        <div className={styles.avatar}>
          <NavLink to={"/profile/" + user.id}>
            <img
              className={styles.avatar__thumb}
              src={user.photos.small != null ? user.photos.small : avatar}
              alt="avatar"
            />
          </NavLink>
        </div>
        <div className={styles.follow}>
          {user.followed ? (
            <button
              disabled={usersPage.isFollowingInProgress.includes(user.id)}
              onClick={() => {
                dispatch(unFollowThunkCreator(user.id));
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={usersPage.isFollowingInProgress.includes(user.id)}
              onClick={() => {
                dispatch(followThunkCreator(user.id));
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className={styles.right_block}>
        <ul>
          <li>{user.name}</li>
          <li className={styles.location}>
            {"${user.address.city}, ${user.address.country}"}
          </li>
          <li>{user.status}</li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
