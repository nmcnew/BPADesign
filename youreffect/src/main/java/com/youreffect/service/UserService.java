package com.youreffect.service;

import com.youreffect.exception.LoginException;
import com.youreffect.exception.RegisterException;
import com.youreffect.impl.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Deeban Ramalingam
 * UserService uses UserDaoImpl to interact with spring.database, abstract out CRUD operations, and perform basic User operations
 */
public class UserService {

    /** perform spring.database interactions */
    @Autowired
    private UserDaoImpl userDaoImpl;

    /** hash away critical data */
    @Autowired
    private HashService hashService;

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
    public User register (User user) throws RegisterException {
        String checkCopyId = hashService.md5(user.getUsername());
        if(exists(checkCopyId)) {
            throw new RegisterException("failed to register new user because username already exists");
        }
        return create(user);
    }

    /**
     * logs in user by indexing for a user by id and hashed password
     * @param user user
     * @return User object
     */
    public User login (User user) throws LoginException {
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        if(!exists(user.getUserId(), user.getPassword())) {
            throw new LoginException("login failed");
        }
        return read(user.getUserId(), user.getPassword());
    }

    /**
     * create user
     * @param user user
     * @return user
     */
    public User create(User user) {
        user.setDateRegistered(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()));
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        userDaoImpl.createUser(user);
        return user;
    }

    /**
     * read user
     * @param id user id
     * @param password user password
     * @return user
     */
    public User read(String id, String password) {
        return userDaoImpl.readUser(id, password);
    }

    /**
     * read user
     * @param id user id
     * @return user
     */
    public User read(String id) {
        return userDaoImpl.readUser(id);
    }

    /**
     * update user
     * @param user user
     */
    public void update(User user) {
        userDaoImpl.updateUser(user);
    }

    /**
     * delete user
     * @param id user id
     */
    public void delete(String id) {
        userDaoImpl.deleteUser(id);
    }

}
