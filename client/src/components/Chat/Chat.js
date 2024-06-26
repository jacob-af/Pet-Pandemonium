import React, { useRef, useEffect } from "react";

import "./chat.css";
import { useSocketContext } from "../../utils/SocketState";
import { useChatContext } from "../../utils/ChatState";
import { useUserContext } from "../../utils/UserState";

const Chat = () => {
  const inputRef = useRef();
  const socket = useSocketContext();
  const [{ room, userName, chatLog }, chatDispatch] = useChatContext();
  const [user] = useUserContext();

  useEffect(() => {
    //socket = io(CONNECTION_PORT);
    chatDispatch({ type: "SET_USERNAME", data: user.userName });
    socket.emit("join_room", {
      room: room,
      userName: user.userName,
      userId: user._id,
      userData: {
        userName: user.userName,
        userId: user._id,
        wins: user.wins,
        losses: user.losses
      },
      text: `has joined room ${room}`
    });
  }, []);

  useEffect(() => {
    socket.on("set_socket_id", data => {
      chatDispatch({
        type: "SET_SOCKET_ID",
        data
      });
    });
    socket.on("receive_message", data => {
      chatDispatch({
        type: "RECEIVE_MESSAGE",
        data
      });
    });
    socket.on("add_user", data => {
      console.log("add server, client side: ", data);
      chatDispatch({
        type: "ADD_USER",
        data
      });
    });
    return () => {
      socket.off("set_socket_id");
      socket.off("receive_message");
      socket.off("add_user");
    };
  }, [socket]);

  const sendMessage = event => {
    event.preventDefault();
    let newMessage = {
      room,
      userName,
      text: inputRef.current.value
    };
    inputRef.current.value = "";
    socket.emit("chat_message", newMessage);
    chatDispatch({ type: "SEND_MESSAGE", data: newMessage });
  };

  return (
    <div className="chat-box" id="chat-box">
      <div className="row">
        <div className="col chat-wrapper">
          <div className="chat-msg">
            <ul id="messages">
              {chatLog.map((msg, index) => {
                return <li key={index}>{msg.userName + ": " + msg.text}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="row chat-input">
        <div className="col">
          <form id="chat-form" action="">
            <input id="input" autoComplete="off" ref={inputRef} />
            <button onClick={sendMessage}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
