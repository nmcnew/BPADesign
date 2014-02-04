package com.youreffect.dao;

import com.youreffect.model.Item;

/**
 * @author Deeban Ramalingam
 * ItemDao lays out basic CRUD operations for Item
 */
public interface ItemDao {
    /** create item */
    void create(Item item);
    /** read item data by on id */
    Item read(String id);
    /** update item by properties */
    void update(Item item);
    /** delete item based on id */
    void delete(String id);
}
