import classes from "./Message.module.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={`${classes.messageContainer} ${classes.justifyEnd}`}>
      <p className={classes.sentText}>{name}</p>
      <div className={`${classes.messageBox} ${classes.backgroundBlue}`}>
        <p className={`${classes.message} ${classes.colorWhite}`}>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    </div>
  ) : (
    <div className={`${classes.messageContainer} ${classes.justifyStart}`}>
      <div className={`${classes.messageBox} ${classes.backgroundLight}`}>
        <p className={`${classes.sentText} ${classes["pl-10"]}`}>{user}</p>
      </div>
      <p className={`${classes.message} ${classes.colorDark}`}>
        {ReactEmoji.emojify(text)}
      </p>
    </div>
  );
};

export default Message;
