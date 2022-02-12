import classes from "./Messages.module.css";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className={classes.messages}>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
