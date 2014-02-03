package com.youreffect.dao;

import com.youreffect.model.User;

/**
 * @author Deeban Ramalingam
 * UserDao lays out basic CRUD operations for User
 */
public interface UserDao {
    /** create user */
    void createUser(User user);
    /** read user data by on id */
    User readUser(String id);
    /** read user data by id and hashed password */
    User readUser(String id, String password);
    /** update user by properties */
    void updateUser(User user);
    /** delete user based on id */
    void deleteUser(String id, String password);
}
