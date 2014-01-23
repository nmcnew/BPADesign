function register(username, email, password, country) {
    var user = new User(username, email, password, country);
    $.ajax({
        url:  '/user/register',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
            if($("#dialog").hasClass("hidden")) {
                $("#dialog").removeClass("hidden");
            }
            $("#cmd").html("Register");
            $("#response").html(data.message);

        }
    });
}

function login(username, password) {
    var user = new User(username, '', password, '');
    $.ajax({
        url: '/user/login',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
            if(data.message.toString().indexOf('successful') != -1) {
                localStorage.setItem("curUser",JSON.stringify(data.data));

            }
            if($("#dialog").hasClass("hidden")) {
                $("#dialog").removeClass("hidden");
            }
            $("#cmd").html("Login");
            $("#response").html(data.message);

        }
    });
}
