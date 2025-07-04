// src/SocketContext.js
import React, { createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.10:3000/";

const SocketContext = createContext(null);

export const Socket = ({ children }) => {
  // useRef so we only create one instance ever
  const socketRef = useRef();
  if (!socketRef.current) {
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a <SocketProvider>");
  }
  return socket;
};