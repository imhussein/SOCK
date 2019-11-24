const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Started At Port ${port}`);
});

const socketio = require("socket.io");
const io = socketio(server);

io.on("connection", function(socket) {
  socket.emit("welMessage", {
    data: { message: "This message comes from server" }
  });

  socket.on("message", message => {
    console.log(message);
  });

  socket.on("valueAdded", data => {
    socket.emit("valueAdded", data);
  });
});
