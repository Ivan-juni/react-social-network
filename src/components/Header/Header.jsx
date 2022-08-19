import styles from "./header.module.css";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import { logoutTC } from "../../Redux/auth-reducer";
import { useDispatch } from "react-redux";
import avatar from "../../images/ava-icon.jpeg";

const Header = (props) => {
  const dispatch = useDispatch();

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className="logo__thumb" />
      </div>
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          // <div className={styles.logout}>
          //   <NavLink
          //     to={`/profile/${props.userId}`}
          //     className={styles.profileLink}
          //   >
          //     <span className={styles.loginName}>{props.login} -</span>
          //   </NavLink>
          <div className={styles.navigation}>
            <a className={styles.logoutButton}>
              <NavLink
                to={`/profile/${props.userId}`}
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
            </a>
          </div>
        ) : (
          // </div>
          // </div>
          //   <div className={styles.logout}>
          //     <NavLink
          //       to={`/profile/${props.userId}`}
          //       className={styles.profileLink}
          //     >
          //       <span className={styles.loginName}>{props.login} -</span>
          //     </NavLink>
          //     <button
          //       className={styles.logoutButton}
          //       onClick={() => dispatch(logoutTC())}
          //     >
          //       Log out
          //     </button>
          //   </div>
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
