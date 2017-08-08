let socket = io();

socket.on("connect", function(){
    console.log("Connected to server");

    socket.emit("createMessage", {
        from: "chris@example.com",
        text: "Hello! I like to chat!"
    });
});

socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

socket.on("newMessage", (message) => {
    console.log("New message", message);
});