'use strict';

var socket = io();

$('form').submit(function () {
    var input = $('#iroom').val();
    if (input == '') {
        $('#iroom').val('Lobby');
    }
});

socket.on("updateRoomsList", function (rooms) {

    if ($.isEmptyObject(rooms)) {
        return;
    } else {
        var ol = $("<ol></ol>");
        ol.insertBefore("<p></p>").text("Chatrooms:");
        rooms.forEach(function (room) {
            ol.append($("<li></li>").text(room));
        });

        $("#rooms").html(ol);
    }
});
//# sourceMappingURL=index.js.map