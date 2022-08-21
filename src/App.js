import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "./hoc/withRouter";
import withSuspense from "./hoc/withSuspense";
import { initializeAppTC } from "./Redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader";
import Footer from "./components/Footer/Footer";

const Login = withSuspense(
  React.lazy(() => import("./components/Login/Login"))
);
const Dialogs = withSuspense(
  React.lazy(() => import("./components/Dialogs/Dialogs"))
);
const UsersContainer = withSuspense(
  React.lazy(() => import("./components/Users/UsersContainer"))
);

const App = () => {
  // Редакс хуки
  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialized = useSelector((state) => state.app.initialized);
  const dispatch = useDispatch();

  // Ошибки
  const catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
  };

  useEffect(() => {
    // console.log("ComponentDidMount(isAuth)", isAuth);
    dispatch(initializeAppTC());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
    return () =>
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, [isAuth, catchAllUnhandledErrors]);

  if (!initialized) {
    return <Preloader />;
  }
  return (
    <div className="app">
      <div className="app__wrapper">
        <HeaderContainer />
        <NavbarContainer />
        <div className="wrapper__content">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/profile/*" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<Dialogs />} />
            <Route path="/users/*" element={<UsersContainer />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default withRouter(App);
