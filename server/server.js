/**
 * Created by csche on 03.08.2017.
 */

const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath =  path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
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

    socket.on("createMessage", (newMsg) => {
        console.log("createMessage", newMsg);
        io.emit("newMessage", {  // msg to all connected clients
            from: newMsg.from,
            text: newMsg.text,
            createdAt:new Date().getTime()
        });
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