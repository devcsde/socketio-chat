/**
 * Created by csche on 03.08.2017.
 */

const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
const publicPath =  path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to our chat"));// msg only to the joiner


    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined")); // msg to all but joiner

    socket.on("createMessage", (newMsg) => {
        console.log("createMessage", newMsg);
        io.emit("newMessage", generateMessage(newMsg.from, newMsg.text));  // msg to all connected clients
        // socket.broadcast.emit("newMessage",{
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on("disconnect", () => {
        console.log("User was disconnected");
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});