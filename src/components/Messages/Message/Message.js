import classes from "./Message.module.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={`${classes.messageContainer} ${classes.justifyEnd}`}>
      <p className={classes.sentText}>{trimmedName}</p>
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
