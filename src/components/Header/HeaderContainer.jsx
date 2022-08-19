import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const HeaderContainer = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.login);
  const userId = useSelector((state) => state.auth.userId);

  return <Header {...props} isAuth={isAuth} login={login} userId={userId} />;
};

export default HeaderContainer;
