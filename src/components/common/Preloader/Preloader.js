//import preloader from "../../../images/Rocket.gif";
import preloader from "../../../images/1485.gif";

let Preloader = (props) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(124, 124, 124)",
        width: "64px",
        height: "64px",
        margin: "0 auto",
        marginTop: "250px",
      }}
      role={"main"}
    >
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
