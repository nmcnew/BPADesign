package com.youreffect.service;

import com.youreffect.dao.ItemDaoImpl;
import com.youreffect.model.Item;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Deeban Ramalingam
 * ItemService uses ItemDaoImpl to interact with database, abstract out CRUD operations, and perform basic Item operations
 */
public class ItemService {

    /** perform database interactions */
    @Autowired
    private ItemDaoImpl itemDaoImpl;

    public void insertItem(Item item) {
        itemDaoImpl.createItem(item);
    }

    public void setItemDaoImpl(ItemDaoImpl itemDaoImpl) {
        this.itemDaoImpl = itemDaoImpl;
    }
}
