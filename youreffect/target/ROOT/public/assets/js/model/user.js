/**
 * user front-end model
 * @constructor empty constructor for user
 */
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

/**
 * user front-end model
 * @param username
 * @param email
 * @param password
 * @param state
 * @constructor constructs user with username, email, password, and state
 */
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