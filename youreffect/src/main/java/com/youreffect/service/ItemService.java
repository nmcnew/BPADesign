package com.youreffect.service;

import com.youreffect.impl.ItemDaoImpl;
import com.youreffect.model.Item;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author Deeban Ramalingam
 * ItemService uses ItemDaoImpl to interact with spring.database, abstract out CRUD operations, and perform basic Item operations
 */
public class ItemService {

    /** perform spring.database interactions */
    @Autowired
    private ItemDaoImpl itemDaoImpl;

    /** hash away critical data */
    @Autowired
    private HashService hashService;

    /**
     * sets ItemDaoImpl from spring config
     * @param itemDaoImpl value from spring config
     */
    public void setItemDaoImpl(ItemDaoImpl itemDaoImpl) {
        this.itemDaoImpl = itemDaoImpl;
    }

    /**
     * create item
     * @param item item
     * @return item
     */
    public Item create(Item item) {
        item.setDateCreated(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()));
        item.setItemId(hashService.md5(item.getName() + item.getQuantity() + item.getEnergy() + item.getDateCreated() + item.getSpecs()));
        itemDaoImpl.create(item);
        return item;
    }

    /**
     * create item list
     * @param items item list
     * @return item list
     */
    public List<Item> createList(List<Item> items) {
        String dateCreated = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date());
        for (Item i : items) {
            i.setDateCreated(dateCreated);
            i.setItemId(hashService.md5(i.getName() + i.getQuantity() + i.getEnergy() + i.getDateCreated() + i.getSpecs()));
        }
        itemDaoImpl.createList(items);
        return items;
    }

    /**
     * read item
     * @param id item id
     * @return item
     */
    public Item read(String id) {
        return itemDaoImpl.read(id);
    }

    /**
     * update item
     * @param item item
     */
    public void update(Item item) {
        itemDaoImpl.update(item);
    }

    /**
     * delete item
     * @param id item id
     */
    public void delete(String id) {
        itemDaoImpl.delete(id);
    }

    /**
     * read item list
     * @param id user id
     * @return item list
     */
    public List<Item> readList(String id) {
        return itemDaoImpl.readList(id);
    }
}
