"use strict";

/**
 * Created by csche on 03.08.2017.
 */

var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var _require = require("./utils/message"),
    generateMessage = _require.generateMessage,
    generateLocationMessage = _require.generateLocationMessage;

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", function (socket) {
    console.log("New user connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to our chat")); // msg only to the joiner


    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined")); // msg to all but joiner

    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on("createLocationMessage", function (coords) {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on("disconnect", function () {
        console.log("User was disconnected");
    });
});

server.listen(port, function () {
    console.log("Started up at port " + port);
});
//# sourceMappingURL=server.js.map