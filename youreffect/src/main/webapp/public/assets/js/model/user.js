function User() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.country = '';
}

function User(username, email, password, country) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.country = country;
    console.log(this);
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

User.prototype.country = function (country) {
    this.country = country;
}