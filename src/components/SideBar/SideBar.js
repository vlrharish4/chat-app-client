import classes from "./SideBar.module.css";

const SideBar = ({ users }) => {
  return (
    <div className={classes.container}>
      <ul>
        {users.map((user) => {
          return <li key={user.name}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default SideBar;
