package com.youreffect.service;

import com.youreffect.dao.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    @Autowired
    private UserDaoImpl userDaoImpl;

    public void registerUser (User user) {
        userDaoImpl.createUser(user);
    }

    public void loginUser (User user) {
        userDaoImpl.readUser(user);
    }

    public void setUserDaoImpl(UserDaoImpl userDaoImpl) {
        this.userDaoImpl = userDaoImpl;
    }
}
