package com.youreffect.dao;

import com.youreffect.model.User;

public interface UserDao {
    void createUser(User user);
    User readUser(String id);
    User readUser(String id, String password);
    void updateUser(User user);
    void deleteUser(User user);
}
