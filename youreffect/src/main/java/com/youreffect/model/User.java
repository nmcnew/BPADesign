package com.youreffect.model;

/**
 * @author Deeban Ramalingam
 * User POJO
 */
public class User {

    /** primary key user id for database indexing */
    private String userId;
    /** user's username */
    private String username;
    /** user's email */
    private String email;
    /** user's hashed password */
    private String password;
    /** user's state */
    private String state;
    /** date registered */
    private String dateRegistered;


    /**
     * get user id
     * @return user id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * set user id
     * @param userId set user id to this
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * get user username
     * @return user username
     */
    public String getUsername() {
        return username;
    }

    /**
     * set user username
     * @param username set username to this
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * get user email
     * @return user email
     */
    public String getEmail() {
        return email;
    }

    /**
     * set user email
     * @param email set user email to this
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * get user state
     * @return user state
     */
    public String getState() {
        return state;
    }

    /**
     * set user state
     * @param state set user state to this
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * get user password
     * @return user password
     */
    public String getPassword() {
        return password;
    }

    /**
     * set user password
     * @param password set password to this
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public String getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(String dateRegistered) {
        this.dateRegistered = dateRegistered;
    }


    /**
     * string representation of User
     * @return string representation of User
     */
    public String toString() {
        return String.format(
                "User[id=%s, username='%s', email='%s', state='%s', password='%s', dateRegistered='%s'",
                userId, username, email, state, password, dateRegistered);
    }
}
