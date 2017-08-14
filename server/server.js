const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");
    io.emit("updateRoomsList", users.getRoomList());

    socket.on("join", (userData, callback) => {
        if (!isRealString(userData.name) || !isRealString(userData.room)) {
            return callback("Name und Raum werden benoetigt.");
        }
        socket.join(userData.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, userData.name, userData.room);
        io.to(userData.room).emit("updateUserList", users.getUserList(userData.room));
        socket.emit("newMessage", generateMessage("Fr'amily", "Willkommen im Chat"));
        socket.broadcast.to(userData.room).emit("newMessage", generateMessage("Fr'amily", `${userData.name} ist beigetreten.`));

        callback();
    });




    socket.on("createMessage", (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Fr'amily", `${user.name} ist gegangen.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});