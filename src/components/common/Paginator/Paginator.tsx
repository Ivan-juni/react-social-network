import React from "react";
import styles from "./Paginator.module.css";
import Pagination from "@mui/material/Pagination";
import {usersPageType} from "../../../types/types"

type PropsType = {
  usersPage: usersPageType
  currentPageChange: (page: number) => void
}

const Paginator: React.FC<PropsType>  = ({ usersPage, currentPageChange }) => {

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
