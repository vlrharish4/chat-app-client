import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Join.module.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const roomChangeHandler = (event) => {
    setRoom(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (name && room) {
      navigate(`/chat?name=${name}&room=${room}`);
    }
  };

  return (
    <div className={classes.joinOuterContainer}>
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
            onChange={roomChangeHandler}
            value={room}
          />
          <button className={`${classes.button} mt-20`} type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
