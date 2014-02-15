package com.youreffect.dao;

import com.youreffect.model.User;

import java.util.List;

/**
 * @author Deeban Ramalingam
 * UserDao lays out basic CRUD operations for User
 */
public interface UserDao {
    /** create user */
    void create(User user);
    /** read user data by id */
    User read(String id);
    /** read user data by id and hashed password */
    User read(String id, String password);
    /** read list of user data*/
    List<User> readList();
    /** update user by database */
    void update(User user);
    /** delete user based on id */
    void delete(String id);
}
