$(function () {
    var content = $("#content");
    var status = $("#status");
    var input = $("#input");
    var myName = false;
    //Build Web Socket connection
    socket = io.connect("http://localhost");
    //Confirm connection
    socket.on("open", function () {
        status.text("Name:");
    });

    //Listen to system
    socket.on("system", function (json) {
        var p = "";
        if (json.type === "welcome") {
            if (myName === json.text) {
                status.text(myName + ": ").css("color", json.color);
                p = '<p style="background:' + json.color + '">system  @ ' + json.time + ' : Welcome ' + json.text + '</p>';
            } else if (json.type === "disconnect") {
                p = '<p style="background:' + json.color + '">system  @ ' + json.time + ' : Bye ' + json.text + '</p>';
            }
            content.prepend(p);
        }
    });

    //Listen to message event
    socket.on("message", function (json) {
        var p = '<p><span style="color:' + json.color + ';">' + json.author + '</span> @ ' + json.time + ' : ' + json.text + '</p>';
        content.prepend(p);
    });

    //Submit message via enter
    input.keydown(function (e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) return;
            socket.send(msg);
            $(this).val("");
            if (myName === false) {
                myName = msg;
            }
        }
    });
});