import { useState, useEffect } from "react";
import io from "socket.io-client";
import classes from "./Chat.module.css";
import { useSelector } from "react-redux";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import SideBar from "../SideBar/SideBar";
import { ENDPOINT } from "../../constants";

let socket;

const Chat = () => {
  const auth = useSelector((state) => state.auth);
  const [roomData, setRoomData] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      { name: auth.name, roomID: auth.room.id },
      (user, roomDetails, error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${user.name} has joined the room ${roomDetails.id}!`);
        }
      }
    );

    return () => {
      console.log("disconnect");
      socket.emit(
        "removeUser",
        { name: auth.name, roomID: auth.room.id },
        (roomDetails) => {
          console.log(`You left the room ${roomDetails.id}!`);
        }
      );
      socket.disconnect();
      socket.off();
    };
  }, [auth.room.id, auth.name]);

  // Use effect to listen to messages from server
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Use effect to listen to users list from server
  useEffect(() => {
    socket.on("roomData", (roomDataFromServer) => {
      console.log("Room data: ", roomDataFromServer);
      setRoomData(roomDataFromServer);
    });
  }, [roomData]);

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, auth.room.id, auth.name, () =>
        setMessage("")
      );
    }
  };

  console.log(message, messages);

  return (
    <>
      <div className={classes.outerContainer}>
        {roomData.users && <SideBar users={roomData.users} />}
        <div className={classes.container}>
          <InfoBar room={auth.room.id} />
          <Messages messages={messages} name={auth.name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
