
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config()

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: `${process.env.APP_URL}:${process.env.APP_PORT}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("start_chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send_msgs", (messages,chatId) => {
    socket.to(chatId).emit("receive_msgs", messages);
  });

});

const PORT = process.env.SOCKET_PORT;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
