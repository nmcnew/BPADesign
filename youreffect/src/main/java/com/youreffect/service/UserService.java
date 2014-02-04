package com.youreffect.service;

import com.youreffect.impl.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Deeban Ramalingam
 * UserService uses UserDaoImpl to interact with spring.database, abstract out CRUD operations, and perform basic User operations
 */
public class UserService {

    /** perform spring.database interactions */
    @Autowired
    private UserDaoImpl userDaoImpl;

    /**
     * sets UserDaoImpl
     * @param userDaoImpl performs spring.database interactions
     */
    public void setUserDaoImpl(UserDaoImpl userDaoImpl) {

        this.userDaoImpl = userDaoImpl;
    }

    /**
     * checks if user exists in spring.database by id and password
     * @param id user id
     * @param password user password
     * @return whether user exists in spring.database by id and password
     */
    public boolean exists (String id, String password) {
        if (userDaoImpl.readUser(id, password) != null) {
            return true;
        }
        return false;
    }

    /**
     * checks if user exists in spring.database by id
     * @param id user id
     * @return whether user exists in spring.database by id
     */
    public boolean exists (String id) {
        if (userDaoImpl.readUser(id) != null) {
            return true;
        }
        return false;
    }

    /**
     * registers user by creating user in spring.database
     * @param user User object
     */
    public void register (User user) {
        create(user);
    }

    /**
     * logs in user by indexing for a user by id and hashed password
     * @param id user id
     * @param password user password
     * @return User object
     */
    public User login (String id, String password) {
        return read(id, password);
    }

    public void create(User user) {
        userDaoImpl.createUser(user);
    }

    public User read(String id, String password) {
        return userDaoImpl.readUser(id, password);
    }

    public User read(String id) {
        return userDaoImpl.readUser(id);
    }

    public void update(User user) {
        userDaoImpl.updateUser(user);
    }
    public void delete(String id) {
        userDaoImpl.deleteUser(id);
    }

}
