import React from "react";
import { useState } from "react";
import styles from "./ProfileInfo.module.css";
import bg from "../../../images/intro-bg-1.png";
import avatar from "../../../images/ava-icon.jpeg";
import Preloader from "../../common/Preloader/Preloader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "../../../Redux/profile-reducer.ts";
import ProfileDescription from "./ProfileDescription/ProfileDescription.tsx";
import ProfileDescriptionForm from "./ProfileDescription/ProfileDescriptionForm";
import { RootState } from '../../../types/types';
import { AppDispatch } from "../../../Redux/redux-store";

type PropsType = {
  isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({ isOwner}) => {
  const profile = useSelector((state: RootState) => state.profilePage.profile);
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore: Object is possibly 'null'.
    if (e.target.files.length == 1) {
      // @ts-ignore: Object is possibly 'null'.
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
                  <label htmlFor={"file"} className={styles.fileCaption}>
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
