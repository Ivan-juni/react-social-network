import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
//import { profileThunkCreator } from "../Redux/profile-reducer.ts";
import { RootState } from '../types/types';

export function withAuthRedirectFuncionalComponent<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  // ! HOC для функциональных компонент
  function RedirectComponent(props: WCP) {
    // * Redirect *
    type useNavigateType = {
      useNavigate: (arg0: string) => void
    }

    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      setRedirect(true);
    }, [isAuth]);
    // *          *
    if (redirect === true) {
      if (isAuth === false) {
        //alert("You are not authorized");
        return navigate("/login/");
      }
      return <WrappedComponent {...props}/>;
    }
  }
  return RedirectComponent;
};

// const mapStateToPropsForRedirect = (state) => {
//   return {
//     isAuth: state.auth.isAuth,
//   };
// };

// export const withAuthRedirectClassComponent = (Component) => {
//   // ! HOC для классовых компонент
//   class RedirectComponent extends React.Component {
//     render() {
//       if (this.props.isAuth === false) {
//         return <Navigate to={"/login"} />;
//       }
//       return <Component {...this.props} />;
//     }
//   }

//   const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect, {
//     profileThunkCreator,
//   })(RedirectComponent);

//   return ConnectedAuthRedirectComponent;
// };
