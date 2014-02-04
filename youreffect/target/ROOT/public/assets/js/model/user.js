function User() {
    this.userId = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.state = '';
    this.items = {};
    this.dateRegistered = '';
    this.datesLoggedIn = [];
}

function User(username, email, password, state) {
    this.userId = '';
    this.username = username;
    this.email = email;
    this.password = password;
    this.state = state;
    this.items = {};
    this.dateRegistered = '';
    this.datesLoggedIn = [];
}

User.prototype.username = function (username) {
    this.username = username;
}

User.prototype.email = function (email) {
    this.email = email;
}

User.prototype.password = function (password) {
    this.password = password;
}

User.prototype.state = function (state) {
    this.state = state;
}

User.prototype.items = function(items) {
    this.items = items;
}