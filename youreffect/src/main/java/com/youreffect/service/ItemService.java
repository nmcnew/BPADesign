package com.youreffect.service;

import com.youreffect.impl.ItemDaoImpl;
import com.youreffect.model.Item;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Deeban Ramalingam
 * ItemService uses ItemDaoImpl to interact with spring.database, abstract out CRUD operations, and perform basic Item operations
 */
public class ItemService {

    /** perform spring.database interactions */
    @Autowired
    private ItemDaoImpl itemDaoImpl;

    public void setItemDaoImpl(ItemDaoImpl itemDaoImpl) {
        this.itemDaoImpl = itemDaoImpl;
    }

    public void create(Item item) {
        itemDaoImpl.create(item);
    }

    public Item read(String id) {
        return itemDaoImpl.read(id);
    }

    public void update(Item item) {
        itemDaoImpl.update(item);
    }

    public void delete(String id) {
        itemDaoImpl.delete(id);
    }

}
