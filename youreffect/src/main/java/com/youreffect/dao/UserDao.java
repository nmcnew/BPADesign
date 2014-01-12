package com.youreffect.dao;

import com.youreffect.model.User;

public interface UserDao {
    void createUser(User user);
    User readUser(User user);
    void updateUser(User user);
    void deleteUser(User user);
}
