import styles from "./profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({ isOwner }) => {
  return (
    <div className={styles.wrapper}>
      <ProfileInfo isOwner={isOwner} />
      <MyPosts />
    </div>
  );
};

export default Profile;
