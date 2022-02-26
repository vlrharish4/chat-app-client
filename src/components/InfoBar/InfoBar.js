import classes from "./InfoBar.module.css";
import { Link } from "react-router-dom";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className={classes.infoBar}>
      <div className={classes.leftInnerContainer}>
        <img className={classes.onlineIcon} src={onlineIcon} alt="online" />
        <h3>{room}</h3>
      </div>
      <div className={classes.rightInnerContainer}>
        <Link to="/">
          <img src={closeIcon} alt="close" />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
