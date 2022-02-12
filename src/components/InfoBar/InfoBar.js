import classes from "./InfoBar.module.css";

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
        <a href="/">
          <img src={closeIcon} alt="close" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
