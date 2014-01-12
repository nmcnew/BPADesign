package com.youreffect.dao;

import com.youreffect.model.User;
import org.springframework.data.mongodb.core.MongoFactoryBean;

public class UserDaoImpl implements UserDao {

    @Override
    public void createUser(User user) {
        MongoFactoryBean mongo = new MongoFactoryBean();
        mongo.setHost("localhost");

    }

    @Override
    public User readUser(User user) {
        return null;
    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public void deleteUser(User user) {

    }
}
