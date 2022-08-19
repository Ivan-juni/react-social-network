import React from "react";
import styles from "./Paginator.module.css";
import {
  getUsersThunkCreator,
  updateNewCurrentPage,
} from "../../../Redux/users-reducer";
import Pagination from "@mui/material/Pagination";

const Paginator = ({ usersPage, dispatch }) => {
  // const currentPageChange = (e) => {
  //   console.log(e.target.value, typeof e.target.value);

  //   if (e.target.value !== "") {
  //     dispatch(updateNewCurrentPage(e.target.value));
  //     dispatch(getUsersThunkCreator(e.target.value, usersPage.pageSize));
  //   } else {
  //     dispatch(updateNewCurrentPage(1));
  //   }
  // };

  const currentPageChange = (page) => {
    dispatch(updateNewCurrentPage(page));
    dispatch(getUsersThunkCreator(page, usersPage.pageSize));
  };

  return (
    <div className={styles.pages}>
      <Pagination
        count={Math.ceil(usersPage.usersCount / usersPage.pageSize)}
        page={usersPage.currentPage}
        onChange={(_, page) => {
          currentPageChange(page);
        }}
        color="primary"
      />
      {/* <input
        type="number"
        className={styles.currentPage}
        value={usersPage.currentPage}
        max={maxValue}
        min="1"
        onChange={currentPageChange}
      />
      <span>/</span>
      <span className={styles.lastPage}>
        {Math.ceil(usersPage.usersCount / usersPage.pageSize)}
      </span> */}
    </div>
  );
};

export default Paginator;
