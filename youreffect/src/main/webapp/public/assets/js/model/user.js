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
    this.dateRegistered = '';
    this.elecRate = 0;
    this.costOfGas = 0;
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
    this.dateRegistered = '';
    this.elecRate = 0;
    this.costOfGas = 0;
}