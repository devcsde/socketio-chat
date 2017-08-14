"use strict";

var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    // Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function () {
    var userData = $.deparam(window.location.search); //deparam library

    socket.emit("join", userData, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            return "no error";
        }
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on("updateUserList", function (users) {
    var ol = $("<ol></ol>");

    users.forEach(function (user) {
        ol.append($("<li></li>").text(user));
    });

    $("#users").html(ol);
});

socket.on("newMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("H:mm");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("H:mm");
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var messageTextbox = $("[name=message]");

    socket.emit("createMessage", {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val("");
    });
});

var locationButton = $("#send-location");
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
//# sourceMappingURL=chat.js.map