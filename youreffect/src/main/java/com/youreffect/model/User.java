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
    /** user's secret */
    private String secret;
    /** user's state */
    private String state;
    /** date registered */
    private String dateRegistered;
    /** electricity rate in kilowatt-hr */
    private double elecRate;
    /** cost of gas us dollars per cost per cubic foot*/
    private double costOfGas;
    /** admin access 0 => false, 1 => true */
    private int isAdmin;

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

    /**
     * get user secret
     * @return user secret
     */
    public String getSecret() {
        return secret;
    }

    /**
     * set user secret
     * @param secret set user secret to this
     */
    public void setSecret(String secret) {
        this.secret = secret;
    }

    /**
     * get date registered
     * @return date registered
     */
    public String getDateRegistered() {
        return dateRegistered;
    }

    /**
     * set date registered
     * @param dateRegistered set date registered to this
     */
    public void setDateRegistered(String dateRegistered) {
        this.dateRegistered = dateRegistered;
    }

    /**
     * get cost of gas
     * @return cost of gas
     */
    public double getCostOfGas() {
        return costOfGas;
    }

    /**
     * set cost of gas
     * @param costOfGas set cost of gas to this
     */
    public void setCostOfGas(double costOfGas) {
        this.costOfGas = costOfGas;
    }

    /**
     * get electricity rate
     * @return electricity rate
     */
    public double getElecRate() {
        return elecRate;
    }

    /**
     * set electricity rate
     * @param elecRate set electricity rate to this
     */
    public void setElecRate(double elecRate) {
        this.elecRate = elecRate;
    }

    /**
     * get admin access
     * @return isAdmin admin access
     */
    public int getIsAdmin() {
        return isAdmin;
    }

    /**
     * set admin access
     * @param isAdmin set admin access to this
     */
    public void setIsAdmin(int isAdmin) {
        this.isAdmin = isAdmin;
    }

    /**
     * string representation of User
     * @return string representation of User
     */
    public String toString() {
        return String.format(
                "User[id=%s, username='%s', email='%s', state='%s', password='%s', dateRegistered='%s', elecRate='%s', costOfGas='%s'",
                userId, username, email, state, password, dateRegistered, elecRate, costOfGas);
    }
}
