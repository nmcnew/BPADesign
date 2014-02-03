package com.youreffect.service;

import com.youreffect.dao.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Deeban Ramalingam
 * UserService uses UserDaoImpl to interact with database, abstract out CRUD operations, and perform basic User operations
 */
public class UserService {

    /** perform database interactions */
    @Autowired
    private UserDaoImpl userDaoImpl;

    /**
     * checks if user exists in database by id and password
     * @param id user id
     * @param password user password
     * @return whether user exists in database by id and password
     */
    public boolean exists (String id, String password) {
        if (userDaoImpl.readUser(id, password) != null) {
            return true;
        }
        return false;
    }

    /**
     * checks if user exists in database by id
     * @param id user id
     * @return whether user exists in database by id
     */
    public boolean exists (String id) {
        if (userDaoImpl.readUser(id) != null) {
            return true;
        }
        return false;
    }

    /**
     * registers user by creating user in database
     * @param user User object
     */
    public void registerUser (User user) {
        userDaoImpl.createUser(user);
    }

    /**
     * logs in user by indexing for a user by id and hashed password
     * @param id user id
     * @param password user password
     * @return User object
     */
    public User loginUser (String id, String password) {
        return userDaoImpl.readUser(id, password);
    }

    /**
     * sets UserDaoImpl
     * @param userDaoImpl performs database interactions
     */
    public void setUserDaoImpl(UserDaoImpl userDaoImpl) {
        this.userDaoImpl = userDaoImpl;
    }
}
