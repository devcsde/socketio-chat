"use strict";

var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var _require = require("./utils/message"),
    generateMessage = _require.generateMessage,
    generateLocationMessage = _require.generateLocationMessage;

var _require2 = require("./utils/validation"),
    isRealString = _require2.isRealString;

var _require3 = require("./utils/users"),
    Users = _require3.Users;

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", function (socket) {
    console.log("New user connected");

    socket.on("join", function (userData, callback) {
        if (!isRealString(userData.name) || !isRealString(userData.room)) {
            return callback("Name und Raum werden benoetigt.");
        }

        socket.join(userData.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, userData.name, userData.room);

        io.to(userData.room).emit("updateUserList", users.getUserList(userData.room));

        socket.emit("newMessage", generateMessage("Fr'amily", "Willkommen im Chat"));
        socket.broadcast.to(userData.room).emit("newMessage", generateMessage("Fr'amily", userData.name + " ist beigetreten."));

        callback();
    });

    socket.on("createMessage", function (message, callback) {
        console.log("createMessage", message);
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", function (coords) {
        io.emit("newLocationMessage", generateLocationMessage("User", coords.latitude, coords.longitude));
    });

    socket.on("disconnect", function () {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Fr'amily", user.name + " ist gegangen."));
        }
    });
});

server.listen(port, function () {
    console.log("Server is up on " + port);
});
//# sourceMappingURL=server.js.map