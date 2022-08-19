import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { profileThunkCreator } from "../Redux/profile-reducer";

// const mapStateToPropsForRedirect = (state) => {
//   return {
//     isAuth: state.auth.isAuth,
//   };
// };

export const withAuthRedirectFuncionalComponent = (Component) => {
  // ! HOC для функциональных компонент
  const RedirectComponent = () => {
    // * Redirect *
    const navigate = useNavigate("/login/");
    const isAuth = useSelector((state) => state.auth.isAuth);
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
      return <Component />;
    }
  };
  return RedirectComponent;
};

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
