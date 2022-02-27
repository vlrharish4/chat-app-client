import { useState } from "react";
import classes from "./Create.module.css";
import { ENDPOINT } from "../../constants";
import { authActions } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Create = () => {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const toggleChangeHandler = (event) => {
    setIsPrivate(event.target.checked);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const createRoomHandler = async (event) => {
    event.preventDefault();
    if (name) {
      let body = {
        name,
        isPrivate,
      };
      if (isPrivate) {
        if (password) {
          body.password = password;
        } else {
          return;
        }
      }
      const response = await fetch(ENDPOINT + "/rooms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const room = await response.json();
      console.log(room);
      dispatch(
        authActions.setAuthentication({ isAuthenticated: true, room, name })
      );
      navigate("/chat");
    }
  };
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1 className={classes.heading}>Create Room</h1>
        <form onSubmit={createRoomHandler}>
          <input
            placeholder="Name"
            className={classes.input}
            type="text"
            onChange={nameChangeHandler}
            value={name}
          />
          {isPrivate && (
            <input
              placeholder="Password"
              className={`${classes.input} mt-20`}
              type="password"
              onChange={passwordChangeHandler}
              value={password}
            />
          )}
          <div className={classes.checkboxContainer}>
            <label className={classes.text}>Public</label>
            <label className={classes.switch}>
              <input
                type="checkbox"
                value={isPrivate}
                onChange={toggleChangeHandler}
              />
              <span className={`${classes.slider} ${classes.round}`}></span>
            </label>
            <label className={classes.text}>Private</label>
          </div>
          <button className={`${classes.button} mt-20`} type="submit">
            Create!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
