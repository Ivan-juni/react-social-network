import React from "react";
import styles from "./profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";

type PropsType = {
  isOwner: boolean
}

const Profile: React.FC<PropsType> = ({ isOwner }) => {
  return (
    <div className={styles.wrapper}>
      <ProfileInfo isOwner={isOwner} />
      <MyPosts />
    </div>
  );
};

export default Profile;
