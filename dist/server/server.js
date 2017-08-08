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

    socket.on("disconnect", function () {
        console.log("User was disconnected");
    });
});

server.listen(port, function () {
    console.log("Started up at port " + port);
});
//# sourceMappingURL=server.js.map