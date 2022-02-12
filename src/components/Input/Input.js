import classes from "./Input.module.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className={classes.form}>
      <input
        className={classes.input}
        placeholder="Type a message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        type="text"
      />
      <button
        className={classes.sendButton}
        onClick={(event) => sendMessage(event)}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
