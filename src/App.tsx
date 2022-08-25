import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import Header from "./components/Header/Header.tsx";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "./hoc/withRouter.tsx";
import withSuspense from "./hoc/withSuspense.tsx";
import { initializeAppTC } from "./Redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { AppDispatch } from "./Redux/redux-store.ts"
import { RootState } from './types/types';

const Login = withSuspense(
  React.lazy(() => import("./components/Login/Login"))
);
const Dialogs = withSuspense(
  React.lazy(() => import("./components/Dialogs/Dialogs.tsx"))
);
const UsersContainer = withSuspense(
  React.lazy(() => import("./components/Users/UsersContainer.tsx"))
);


const App = () => {
  // Редакс хуки
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const initialized = useSelector((state: RootState) => state.app.initialized);
  const dispatch: AppDispatch = useDispatch();

  // Ошибки
  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };

  useEffect(() => {
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
        <Header />
        <Navbar />
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
