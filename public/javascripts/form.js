$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        console.log("im on jquery");
        var data = {
            email: $("#email").val(),
            password: $("#password").val()
        };


    });
});