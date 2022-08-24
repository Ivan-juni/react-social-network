import React from "react";
import styles from "./Paginator.module.css";
import {
  usersActions
} from "../../../Redux/users-reducer.ts";
import Pagination from "@mui/material/Pagination";
import {usersPageType} from "../../../types/types"

type PropsType = {
  usersPage: usersPageType
  dispatch: any
}

const Paginator: React.FC<PropsType>  = ({ usersPage, dispatch }) => {

  const currentPageChange = (page: number) => {
    dispatch(usersActions.updateNewCurrentPage(page));
    dispatch(usersActions.getUsersThunkCreator(page, usersPage.pageSize));
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
    </div>
  );
};

export default Paginator;
