import styles from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import avatar from "../../../images/ava-icon.jpeg";
import React from 'react';

type PropsType = {
  name: string
  id: number
  key: number
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.user}>
      <div className={styles.user__thumb}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
        <NavLink
          to={`/dialogs/${props.id}`}
          className={(dialogsData) =>
            dialogsData.isActive ? styles.active : styles.navlink
          }
        >
          {props.name}
        </NavLink>
      </div>
      <hr className={styles.hline}></hr>
    </div>
  );
};

export default DialogItem;
