function register(username, email, password, country) {
    var user = new User(username, email, password, country);

    $.ajax({
        url: 'http://localhost:8080/user/register',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8"
    }).then(function(data, status, jqxhr) {
            console.log(data);
    });
}

function login(username, password) {
    var user = new User(username, '', password, '');
    $.ajax({
        url: 'http://54.214.154.98:8080/user/login',
        type: 'POST',
        dataType: 'json',
        async: false,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8"
    }).then(function(data, status, jqxhr) {
            console.log(data);
    });
}
