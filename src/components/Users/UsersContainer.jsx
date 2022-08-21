import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunkCreator } from "../../Redux/users-reducer.ts";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

const UsersContainer = () => {
  const dispatch = useDispatch();
  const usersPage = useSelector((state) => state.usersPage);

  useEffect(() => {
    dispatch(getUsersThunkCreator(usersPage.currentPage, usersPage.pageSize));
  }, [usersPage.currentPage]);

  return (
    <>
      {usersPage.isFetching ? (
        <Preloader />
      ) : (
        <Users dispatch={dispatch} usersPage={usersPage} />
      )}
    </>
  );
};

export default UsersContainer;

// class UsersContainer extends React.Component {
//   componentDidMount() {
//     this.props.getUsersThunkCreator(
//       this.props.currentPage,
//       this.props.pageSize
//     );
//     console.log("isFollowingInProgress:", this.props.isFollowingInProgress);
//   }
//   currentPageChange = (e) => {
//     this.props.updateNewCurrentPage(e.target.value);
//     this.props.getUsersThunkCreator(e.target.value, this.props.pageSize);
//   };
//   render() {
//     debugger;
//     return (
//       <>
//         {this.props.isFetching ? (
//           <Preloader />
//         ) : (
//           <Users
//             usersCount={this.props.usersCount}
//             pageSize={this.props.pageSize}
//             currentPage={this.props.currentPage}
//             users={this.props.users}
//             followThunkCreator={this.props.followThunkCreator}
//             unFollowThunkCreator={this.props.unFollowThunkCreator}
//             isFetching={this.props.isFetching}
//             isFollowingInProgress={this.props.isFollowingInProgress}
//             currentPageChange={this.currentPageChange}
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     usersCount: state.usersPage.usersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     isFollowingInProgress: state.usersPage.isFollowingInProgress,
//   };
// };

// export default connect(mapStateToProps, {
//   updateNewCurrentPage,
//   getUsersThunkCreator,
//   followThunkCreator,
//   unFollowThunkCreator,
// })(UsersContainer);
