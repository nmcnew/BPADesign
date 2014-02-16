/**
 * user front-end model
 * @constructor empty constructor for user
 */
function User() {
    this.userId = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.secret = '';
    this.state = '';
    this.dateRegistered = '';
    this.elecRate = 0;
    this.costOfGas = 0;
    this.isAdmin = 0;

}

/**
 * user front-end model
 * @param username
 * @param email
 * @param password
 * @param state
 * @param dateRegistered
 * @param elecRate
 * @param costOfGas
 * @param isAdmin
 * @constructor constructs user with username, email, password, and state
 */
function User(username, email, password, state) {
    this.userId = '';
    this.username = username;
    this.email = email;
    this.password = password;
    this.secret = '';
    this.state = state;
    this.dateRegistered = '';
    this.elecRate = 0;
    this.costOfGas = 0;
    this.isAdmin = 0;

}
