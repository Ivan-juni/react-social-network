import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile.tsx";
import { Navigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import {
  getStatusThunkCreator,
  profileThunkCreator,
} from "../../Redux/profile-reducer.ts";
//import withRouter from "../../hoc/withRouter";
import { RootState } from '../../types/types';
import { AppDispatch } from '../../Redux/redux-store.ts';

const ProfileContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const authorizedUser = useSelector((state: RootState) => state.auth.userId);

  let userId: number | null = Number(useParams().userId);
  useEffect(() => {
    if (!userId) {
      userId = authorizedUser;
      if (!userId) {
        <Navigate to={"/login"} />;
      }
    }
    dispatch(profileThunkCreator(userId));
    dispatch(getStatusThunkCreator(userId));
  }, [userId]);

  return <Profile isOwner={!userId || userId == authorizedUser} />;
};

export default compose(
  //withRouter,
  withAuthRedirect // HOC
)(ProfileContainer);
