"use strict";

/**
 * Created by csche on 03.08.2017.
 */

var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var _require = require("./utils/message"),
    generateMessage = _require.generateMessage;

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

    socket.on("createMessage", function (newMsg, callback) {
        console.log("createMessage", newMsg);
        io.emit("newMessage", generateMessage(newMsg.from, newMsg.text)); // msg to all connected clients
        callback("This is from the server");

        // socket.broadcast.emit("newMessage",{
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on("disconnect", function () {
        console.log("User was disconnected");
    });
});

server.listen(port, function () {
    console.log("Started up at port " + port);
});
//# sourceMappingURL=server.js.map