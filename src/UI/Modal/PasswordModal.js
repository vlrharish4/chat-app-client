import ReactDOM from "react-dom";
import { useState } from "react";
import classes from "./PasswordModal.module.css";
import { ENDPOINT } from "../../constants";

const Backdrop = ({ onClose }) => {
  return (
    <div className={classes.backdrop} onClick={() => onClose(false)}></div>
  );
};

const ModalOverlay = ({ roomID, onClose }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password) {
      setIsLoading(true);
      const response = await fetch(`${ENDPOINT}/rooms/${roomID}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const { status, error } = await response.json();

      if (error) {
        setShowError(error);
        return;
      }

      if (status) {
        onClose(true);
      }
    }
  };
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>This room is private!</h2>
      </header>
      <div className={classes.content}>
        <p>Please enter the password to join this room</p>
        <input
          type="password"
          value={password}
          className={classes.input}
          onChange={passwordChangeHandler}
        />
        {showError && <p className={classes.error}>{showError}</p>}
      </div>
      <footer className={classes.actions}>
        <button
          className={classes.button}
          onClick={submitHandler}
          disabled={isLoading}
        >
          Join
        </button>
        <button
          className={classes.button}
          style={{ background: "orange" }}
          onClick={onClose}
        >
          Close
        </button>
      </footer>
    </div>
  );
};

const PasswordModal = ({ roomID, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay roomID={roomID} onClose={onClose} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default PasswordModal;
