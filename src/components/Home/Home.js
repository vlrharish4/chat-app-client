import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Chat App</h2>
      <div className={classes.body}>
        <p>A React-Node JS based Chat application. Powered by Socket.IO</p>
        <button
          className={classes.button}
          onClick={() => {
            navigate("/create");
          }}
        >
          Create
        </button>
        <button
          className={classes.button}
          onClick={() => {
            navigate("/join");
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Home;
