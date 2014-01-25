package com.youreffect.dao;

import com.youreffect.model.Item;

/**
 * @author Deeban Ramalingam
 * ItemDao lays out basic CRUD operations for Item
 */
public interface ItemDao {
    /** create item */
    void createItem(Item item);
    /** read item data by on id */
    Item readItem(String id);
    /** update item by properties */
    void updateItem(Item item);
    /** delete item based on id */
    void deleteItem(String id);
}
