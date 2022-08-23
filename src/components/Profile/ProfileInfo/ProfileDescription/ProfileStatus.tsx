import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusThunkCreator } from "../../../../Redux/profile-reducer.ts";
import styles from "./ProfileDescription.module.css";
import { RootState } from '../../../../types/types';
import { AppDispatch } from "../../../../Redux/redux-store";

const ProfileStatus = () => {
  const dispatch: AppDispatch = useDispatch();
  const statusBLL = useSelector((state: RootState) => state.profilePage.status);

  let [status, setStatus] = useState(statusBLL);
  let [editMode, setEditMode] = useState(false);

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatusThunkCreator(status));
  };

  useEffect(() => {
    setStatus(statusBLL);
  }, [statusBLL]);

  return (
    <div className={styles.wrapperStatus}>
      <div className={styles.status}>
        <h3>Status:</h3>
        {editMode ? (
          <input
            type="text"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                deactivateEditMode();
              }
            }}
            onBlur={() => deactivateEditMode()}
            autoFocus={true}
          />
        ) : (
          <span onDoubleClick={() => setEditMode(true)}>
            {statusBLL || "------"}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileStatus;
