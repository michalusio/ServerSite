$("#dynmap").stop(true, false).animate({ width: "toggle" }, 5);

$(document).ready(function () {
    updateOnline();
    setInterval(function() {
            updateOnline();
        },
        2000);
    $(document).bind("mousewheel DOMMouseScroll",
        function(event) {
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                if ($(document).scrollTop() < $("#title-screen").innerHeight() + 16) {
                    //event.preventDefault();
                    $("html, body").stop(true, false).animate({
                        scrollTop: 0
                    }, 1000);
                }
            } else {
                if ($(document).scrollTop() < $("#title-screen").innerHeight()) {
                    //event.preventDefault();
                    $("html, body").stop(true, false).animate({
                        scrollTop: $("#title-screen").innerHeight()
                    }, 1000);
                }
            }
        });
});

function toggleMap() {
    $("#dynmap").stop(true, false).animate({ width: "toggle" }, 500);
                

}

function updateOnline() {
    var onlineSpan = $("#title-text-online");
    $.get("https://mcapi.ca/query/copper-gameserv.ddns.net/players",
        function(data) {
            if (!data.status) {
                onlineSpan.css("color", "red");
                onlineSpan.html("The server is offline");
            } else {
                onlineSpan.css("color", "white");
                onlineSpan.html("<span style='color:chartreuse'>" +
                    data.players.online +
                    "/" +
                    data.players.max +
                    "</span> online players");
            }
        }).fail(function() {
        onlineSpan.css("color", "red");
        onlineSpan.html("The server is offline");
    });
}