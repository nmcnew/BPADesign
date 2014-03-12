package com.youreffect.service;

import com.youreffect.exception.LoginException;
import com.youreffect.exception.RegisterException;
import com.youreffect.impl.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

    /** generates salt of random bits */
    @Autowired
    private SaltService saltService;

    /** user reference */
    @Autowired
    private User user;

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
        if (userDaoImpl.read(id, password) != null) {
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
        if (userDaoImpl.read(id) != null) {
            return true;
        }
        return false;
    }

    /**
     * registers user by creating user in spring.database
     * @param user User object
     * @return registered use
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
        if (!exists(user.getUserId())) {
            throw new LoginException("login failed - no such username");
        }
        user.setPassword(hashService.md5(read(user.getUserId()).getSecret() + user.getPassword()));
        if(!exists(user.getUserId(), user.getPassword())) {
            throw new LoginException("login failed - check password");
        }
        return read(user.getUserId(), user.getPassword());
    }

    /**
     * create user
     * @param user user
     * @return created user
     */
    public User create(User user) {
        user.setDateRegistered(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()));
        user.setUserId(hashService.md5(user.getUsername()));
        String secret = saltService.generateSalt();
        user.setSecret(secret);
        user.setPassword(hashService.md5(user.getSecret()+user.getPassword()));
        userDaoImpl.create(user);
        return user;
    }

    /**
     * read user
     * @param id user id
     * @param password user password
     * @return user
     */
    public User read(String id, String password) {
        return userDaoImpl.read(id, password);
    }

    /**
     * read user
     * @param id user id
     * @return user
     */
    public User read(String id) {
        return userDaoImpl.read(id);
    }

    /**
     * reset user password
     * @param code password reset code
     * @param newPassword new password
     * @return updated user
     */
    public User resetPassword(String code, String newPassword) {
        user = userDaoImpl.readByPassword(code);
        user.setPassword(newPassword);
        String secret = saltService.generateSalt();
        user.setSecret(secret);
        user.setPassword(hashService.md5(user.getSecret()+user.getPassword()));
        update(user);
        return user;
    }

    /**
     * update user
     * @param user user
     */
    public void update(User user) {
        userDaoImpl.update(user);
    }

    /**
     * delete user
     * @param id user id
     */
    public void delete(String id) {
        userDaoImpl.delete(id);
    }

    /**
     * read user list
     * @return user list
     */
    public List<User> readList() {
        return userDaoImpl.readList();
    }
}
