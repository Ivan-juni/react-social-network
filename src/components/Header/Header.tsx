import React from "react";
import styles from "./header.module.css";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import { logoutTC } from "../../Redux/auth-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../images/ava-icon.jpeg"
import { AppDispatch } from "../../Redux/redux-store.ts";
import { RootState } from '../../types/types';


const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className="logo__thumb" />
      </div>
      <div className={styles.loginBlock}>
        {isAuth ? (
          <div className={styles.navigation}>
            <div className={styles.logoutButton}>
              <NavLink
                to={`/profile/${userId}`}
                className={styles.profileLink}
              >
                <img src={avatar} alt="ava" className={styles.logoutImg} />
              </NavLink>
              <div
                className={styles.logoutText}
                onClick={() => dispatch(logoutTC())}
              >
                LOGOUT
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NavLink
              to={"/login"}
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.login
              }
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
