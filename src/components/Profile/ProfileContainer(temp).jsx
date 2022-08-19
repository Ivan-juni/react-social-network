import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { profileThunkCreator } from "../../Redux/profile-reducer";
import { withAuthRedirectClassComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.profileThunkCreator(userId);
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, { profileThunkCreator }),
  withRouter,
  withAuthRedirectClassComponent // HOC
)(ProfileContainer);
