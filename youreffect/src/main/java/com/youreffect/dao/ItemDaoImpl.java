package com.youreffect.dao;

import com.youreffect.model.Item;
import com.youreffect.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * @author Deeban Ramalingam
 * ItemDaoImpl performs CRUD operations for Item
 */
public class ItemDaoImpl implements ItemDao{

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
     * creates item in database
     * @param item Item object
     */
    @Override
    public void createItem(Item item) {
        Query query = new Query(Criteria.where("_id").is(item.getUserId()));
        User user = mongoTemplate.findOne(query, User.class);
        System.out.println(user);
        user.addItem(item);
        mongoTemplate.save(user);
    }

    /**
     * read item by id
     * @param id item id
     * @return item by id
     */
    @Override
    public Item readItem(String id) {
        return null;
    }

    /**
     * update item by properties
     * @param item Item object
     */
    @Override
    public void updateItem(Item item) {

    }

    /**
     * delete item by id
     * @param id item id
     */
    @Override
    public void deleteItem(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        User user = mongoTemplate.findOne(query, User.class);
        System.out.println(user);
        user.rmvItem(id);
        mongoTemplate.save(user);
    }
}
