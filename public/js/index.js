const socket = io();

$('form').submit(function(){
    var input = $('#iroom').val();
    if(input == ''){
        $('#iroom').val('Lobby');
    }
});

socket.on("updateRoomsList", (rooms) => {

if ($.isEmptyObject(rooms)){
    return;
} else {
    let ol = $("<ol></ol>");
    ol.insertBefore("<p></p>").text("Chatrooms:");
    rooms.forEach(function(room){
        ol.append($("<li></li>").text(room))
    });

    $("#rooms").html(ol);
}




});
