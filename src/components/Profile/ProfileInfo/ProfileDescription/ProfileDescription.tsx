import React from "react";
import { AppDispatch } from "../../../../Redux/redux-store";
import { contactsType, profileType } from "../../../../types/types";
import styles from "./ProfileDescription.module.css";
import ProfileStatus from "./ProfileStatus.tsx";

type PropsType = {
  profile: profileType
  dispatch: AppDispatch
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileDescription: React.FC<PropsType> = ({ profile, dispatch, isOwner, goToEditMode }) => {
  return (
    <div>
      <div className={styles.description__caption}>
        <span className={styles.description__name}>{profile.fullName}</span>
        <div className="status">
          <ProfileStatus />
        </div>
      </div>
      <ul className={styles.description__info}>
        <li>
          <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </li>
        {profile.lookingForAJob && (
          <li>
            <b>My Professional skills: </b>
            {profile.lookingForAJobDescription}
          </li>
        )}
        <li>
          <b>About me: </b>
          {profile.aboutMe}
        </li>
        <li>
          <b>Contacts:</b>{" "}
          {Object.keys(profile.contacts).map((key) => {
            if (
              profile.contacts[key] !== null &&
              profile.contacts[key] !== ""
            ) {
              return (
                <Contact
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof contactsType]}
                />
              );
            }
          })}
        </li>
      </ul>
      {isOwner && (
        <div className={styles.editProfile}>
          <button className={styles.editButton} onClick={goToEditMode}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

type ContactPropsType = {
  contactTitle: string
  contactValue: string | null
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}: </b>
      <span className={styles.contactValue}>{contactValue}</span>
    </div>
  );
};

export default ProfileDescription;
