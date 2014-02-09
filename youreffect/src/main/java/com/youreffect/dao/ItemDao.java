package com.youreffect.dao;

import com.youreffect.model.Item;

import java.util.List;

/**
 * @author Deeban Ramalingam
 * ItemDao lays out basic CRUD operations for Item
 */
public interface ItemDao {
    /** create item */
    void create(Item item);
    /** read item data by id */
    Item read(String id);
    /** read list of item data owned by user with id */
    List<Item> readList(String id);
    /** update item by database */
    void update(Item item);
    /** delete item by id */
    void delete(String id);
}
