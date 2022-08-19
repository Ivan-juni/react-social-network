import { connect } from "react-redux";
import Navbar from "./Navbar";

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends,
    followed: state.usersPage.followingNow,
  };
};

const NavbarContainer = connect(mapStateToProps, null)(Navbar);

export default NavbarContainer;
