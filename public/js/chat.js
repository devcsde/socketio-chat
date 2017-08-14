const socket = io();

function scrollToBottom () {
    // Selectors
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");
    // Heights
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function () {
    let userData = $.deparam(window.location.search); //deparam library

    socket.emit("join", userData, (err) => {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("no error")
        }
    })
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on("updateUserList", (users) => {
    let ol = $("<ol></ol>");

    users.forEach(function(user){
        ol.append($("<li></li>").text(user))
    });

    $("#users").html(ol);
});

socket.on("newMessage", function (message) {
    let formattedTime = moment(message.createdAt).format("H:mm");
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
    let formattedTime = moment(message.createdAt).format("H:mm");
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    let messageTextbox = $("[name=message]");

    socket.emit("createMessage", {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val("")
    });
});

let locationButton = $("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation nicht unterstuetzt.");
    }

    locationButton.attr("disabled", "disabled").text("Ermittle Position...");

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr("disabled").text("Sende GPS");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr("disabled").text("Sende GPS");
        alert("Keine Verbindung zum GPS.");
    });
});