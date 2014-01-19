package com.youreffect.service;

import com.youreffect.dao.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    @Autowired
    private UserDaoImpl userDaoImpl;

    public boolean exists (String id, String password) {
        if (userDaoImpl.readUser(id, password) != null) {
            return true;
        }
        return false;
    }

    public boolean exists (String id) {
        if (userDaoImpl.readUser(id) != null) {
            return true;
        }
        return false;
    }

    public void registerUser (User user) {
        userDaoImpl.createUser(user);
    }

    public User loginUser (String id, String password) {
        return userDaoImpl.readUser(id, password);
    }

    public void setUserDaoImpl(UserDaoImpl userDaoImpl) {
        this.userDaoImpl = userDaoImpl;
    }
}
