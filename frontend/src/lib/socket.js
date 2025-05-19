import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: true,
});

socket.connect();

export default socket;
