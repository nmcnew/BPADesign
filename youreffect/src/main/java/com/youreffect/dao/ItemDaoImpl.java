package com.youreffect.dao;

import com.youreffect.model.Item;
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
        mongoTemplate.insert(item);
    }

    /**
     * read item by id
     * @param id item id
     * @return item by id
     */
    @Override
    public Item readItem(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Item item = mongoTemplate.findOne(query, Item.class);
        return item;
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
        Item item = mongoTemplate.findOne(query, Item.class);
        mongoTemplate.remove(item);
    }
}
