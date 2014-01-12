package com.youreffect.model;

import com.google.gson.Gson;

public class User {

    private String username;
    private String email;
    private String password;
    private String country;

    public User(String username, String email, String password, String country) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.country = country;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String toString() {
        return new Gson().toJson(this);
    }
}
