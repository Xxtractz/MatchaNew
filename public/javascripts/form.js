$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        var data = {
            username: $(".username").val(),
        };

        sendlogin(data, "http://localhost:3000/api/login");
    });
});