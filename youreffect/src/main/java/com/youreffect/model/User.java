package com.youreffect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private long userId;
    private String username;
    private String email;
    private String password;
    private String country;

    public User() {
        this.userId = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.country = "";
    }

    public User(String username, String email, String password, String country) {
        this.userId = hashCode();
        this.username = username;
        this.email = email;
        this.password = password;
        this.country = country;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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
        return String.format(
                "User[id=%s, username='%s', email='%s', password='%s']",
                userId, username, email, password);
    }
}
