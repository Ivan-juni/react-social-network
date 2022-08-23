import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile.tsx";
import { Navigate, useParams } from "react-router-dom";
import { withAuthRedirectFuncionalComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getStatusThunkCreator,
  profileThunkCreator,
} from "../../Redux/profile-reducer.ts";
//import withRouter from "../../hoc/withRouter";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector((state) => state.auth.userId);

  let userId = useParams().userId;
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
  withAuthRedirectFuncionalComponent // HOC
)(ProfileContainer);
