"use strict";

/**
 * Created by csche on 03.08.2017.
 */

var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", function (socket) {
    console.log("New user connected");

    socket.emit("newMessage", { // msg only to the joiner
        from: "Admin",
        text: "Welcome to this chat!",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit("newMessage", { // msg to all but joiner
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    });

    socket.on("createMessage", function (newMsg) {
        console.log("createMessage", newMsg);
        io.emit("newMessage", { // msg to all connected clients
            from: newMsg.from,
            text: newMsg.text,
            createdAt: new Date().getTime()
        });
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