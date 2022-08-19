import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import avatar from "../../images/ava-icon.jpeg";

const Navbar = (props) => {
  let state = props.friends;
  let followed = props.followed;

  let friendsDataTest = followed.map((f) => {
    return (
      <NavLink to={"/profile/" + f.id} className={styles.link}>
        <div className={styles.friend} key={f.id}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <span>{f.name}</span>
        </div>
      </NavLink>
    );
  });

  // let friendsData = state.map((f) => {
  //   return (
  //     <div className={styles.friend} key={f.id}>
  //       <img src={f.avatar} alt="avatar" className={styles.avatar} />
  //       <span>{f.name}</span>
  //     </div>
  //   );
  // });

  return (
    <div className={styles.wrapper}>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.navbar__link}>
            <NavLink
              to="/profile"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              Profile
            </NavLink>
          </li>
          <li className={styles.navbar__link}>
            <NavLink
              to="/dialogs"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              Mesages
            </NavLink>
          </li>
          <li className={styles.navbar__link}>
            <NavLink
              to="/users"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              Users
            </NavLink>
          </li>
          <li className={styles.navbar__link}>
            <NavLink
              to="/news"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              News
            </NavLink>
          </li>
          <li className={styles.navbar__link}>
            <NavLink
              to="/music"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              Music
            </NavLink>
          </li>
          <li className={styles.navbar__link}>
            <NavLink
              to="/settings"
              className={(NavData) =>
                NavData.isActive ? styles.active : styles.link
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
        <div className={styles.wrapper__friends}>
          <div className={styles.friends__caption}>Friends(followed users)</div>
          <div className={styles.friends}>{friendsDataTest}</div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
