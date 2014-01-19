package com.youreffect.service;

import com.youreffect.dao.UserDaoImpl;
import com.youreffect.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public void registerUser (User user) {
        new UserDaoImpl().createUser(user);
    }

    public void loginUser (User user) {
        new UserDaoImpl().readUser(user);
    }
}
