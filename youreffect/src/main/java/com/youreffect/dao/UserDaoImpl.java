package com.youreffect.dao;

import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * @author Deeban Ramalingam
 * UserDaoImpl performs CRUD operations for User
 */
public class UserDaoImpl implements UserDao{

    /** pseudo-ORM tool to reduce boilerplate code and interact with MongoDB */
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * sets Mongo Template from autowired spring bean
     * @param mongoTemplate Mongo Template pseudo-ORM tool
     */
    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    /**
     * creates user in database
     * @param user User object
     */
    @Override
    public void createUser(User user) {
        mongoTemplate.insert(user);
    }

    /**
     * read user by id and hashed password
     * @param id user id
     * @param password user password
     * @return User object
     */
    @Override
     public User readUser(String id, String password) {
        Query query = new Query(Criteria.where("_id").is(id).andOperator(Criteria.where("password").is(password)));
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    /**
     * read user by id
     * @param id user id
     * @return user by id
     */
    @Override
    public User readUser(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    /**
     * update user by properties
     * @param user User object
     */
    @Override
    public void updateUser(User user) {

    }

    /**
     * delete user by id
     * @param id user id
     */
    @Override
    public void deleteUser(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        User user = mongoTemplate.findOne(query, User.class);
        mongoTemplate.remove(user);
    }
}
