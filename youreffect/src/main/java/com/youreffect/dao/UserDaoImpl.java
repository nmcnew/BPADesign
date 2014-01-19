package com.youreffect.dao;

import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{


    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void createUser(User user) {
        mongoTemplate.insert(user);
    }

    @Override
    public User readUser(User user) {
        Query query = new Query(Criteria.where("username").is(user.getUsername()).andOperator(Criteria.where("password").is(user.getPassword())));
        user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public void deleteUser(User user) {
        Query query = new Query(Criteria.where("username").is(user.getUsername()).andOperator(Criteria.where("password").is(user.getPassword())));
        user = mongoTemplate.findOne(query, User.class);
        mongoTemplate.remove(user);
    }
}
