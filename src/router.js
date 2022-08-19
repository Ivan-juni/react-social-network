import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import AuthRedirectComponentDialogs from "./components/Dialogs/Dialogs";

const Routes = {
  "/": () => <div>Hello</div>,
  "/profile/:userId": () => <ProfileContainer />,
  "/profile/*": () => <ProfileContainer />,
  "/users/*": () => <UsersContainer />,
  "/dialogs/*": () => <AuthRedirectComponentDialogs />,
  "/login/*": () => <Login />,
};
export default Routes;
