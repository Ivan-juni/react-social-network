import React from "react";
import preloader from "../../../images/1485.gif";

let Preloader: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(124, 124, 124)",
        width: "64px",
        height: "64px",
        margin: "0 auto",
        marginTop: "150px",
      }}
      role={"main"}
    >
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
