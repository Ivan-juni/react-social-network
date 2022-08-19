import styles from "./ProfileInfo.module.css";
import bg from "../../../images/intro-bg-1.png";
import avatar from "../../../images/ava-icon.jpeg";
import Preloader from "../../common/Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "../../../Redux/profile-reducer";
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import ProfileDescriptionForm from "./ProfileDescription/ProfileDescriptionForm";
import { useState } from "react";

const ProfileInfo = ({ isOwner }) => {
  const profile = useSelector((state) => state.profilePage.profile);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const fileSelected = (e) => {
    if (e.target.files.length) {
      dispatch(setPhoto(e.target.files[0]));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content__background}>
        <img src={bg} alt="bg" className={styles.background__thumb} />
      </div>
      <div className={styles.content__info}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img
              src={profile.photos.large ? profile.photos.large : avatar}
              alt="avatar"
              className={styles.avatarThumb}
            />
            <div className={styles.changePhoto}>
              {isOwner && (
                <div className={styles.changePhotoLabel}>
                  <label for={"file"} className={styles.fileCaption}>
                    Загрузить фотографию профиля
                  </label>
                  <input
                    type={"file"}
                    name="file"
                    id="file"
                    className={styles.file}
                    onChange={fileSelected}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="description">
            {editMode ? (
              <ProfileDescriptionForm
                profile={profile}
                dispatch={dispatch}
                setEditMode={setEditMode}
              />
            ) : (
              <ProfileDescription
                profile={profile}
                dispatch={dispatch}
                isOwner={isOwner}
                goToEditMode={() => setEditMode(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
