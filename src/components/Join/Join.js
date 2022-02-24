import { useState } from "react";
import { authActions } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PasswordModal from "../../UI/Modal/PasswordModal";
import { ENDPOINT } from "../../constants";

import classes from "./Join.module.css";

const Join = () => {
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [room, setRoom] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const roomIDChangeHandler = (event) => {
    setRoomID(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (name && roomID) {
      const response = await fetch(
        `${ENDPOINT}/rooms/${roomID}/users/${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { id, isPrivate, error } = await response.json();

      if (error) {
        setErrorMessage(error);
        return;
      }

      const roomObject = { id, isPrivate };
      setRoom(roomObject);

      if (isPrivate) {
        setIsPrivate(true);
        setShowModal(true);
      } else {
        dispatch(
          authActions.setAuthentication({
            isAuthenticated: true,
            roomObject,
            name,
          })
        );
        navigate("/chat");
      }
    }
  };

  const closeModalHandler = (isAuthenticated) => {
    setShowModal(false);
    if (isPrivate) {
      if (isAuthenticated) {
        dispatch(
          authActions.setAuthentication({ isAuthenticated: true, room, name })
        );
        navigate("/chat");
      }
      return;
    }
    dispatch(
      authActions.setAuthentication({ isAuthenticated: true, room, name })
    );
    navigate("/chat");
  };

  return (
    <div className={classes.joinOuterContainer}>
      {showModal && (
        <PasswordModal roomID={roomID} onClose={closeModalHandler} />
      )}
      <div className={classes.joinInnerContainer}>
        <h1 className={classes.heading}>Join</h1>
        <form onSubmit={submitHandler}>
          <input
            placeholder="Name"
            className={classes.joinInput}
            type="text"
            onChange={nameChangeHandler}
            value={name}
          />
          <input
            placeholder="Room"
            className={`${classes.joinInput} mt-20`}
            type="text"
            onChange={roomIDChangeHandler}
            value={roomID}
          />
          <button className={`${classes.button} mt-20`} type="submit">
            Join!
          </button>
          {errorMessage && <p className={classes.errorText}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Join;
