import React, { createContext, useReducer, useContext } from "react";
import io from "socket.io-client";
const socketURI = (() => {
  console.log(window.location.host);
  if (window.location.host === "localhost:3001") {
    return "http://localhost:3001";
  }
  return window.location.href;
})();
const socket = io(socketURI);

const SocketContext = createContext();
const { Provider } = SocketContext;

function SocketProvider({ value = [], ...props }) {
  return <Provider value={socket} {...props} />;
}

function useSocketContext() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocketContext };
