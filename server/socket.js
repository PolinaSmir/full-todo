const { Server } = require("socket.io");

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("CONNECTION");

    setTimeout(() => {
      io.emit("NEW_NOTIFICATION", { notification: `Current time: ${Date.now()}` });
    }, 5000);

    socket.on("disconnect", (reason) => {
      console.log(reason);
    });
  });

  return io;
};

module.exports = initSocket;
