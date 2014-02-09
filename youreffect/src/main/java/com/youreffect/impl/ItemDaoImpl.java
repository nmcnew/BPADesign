package com.youreffect.impl;

import com.youreffect.dao.ItemDao;
import com.youreffect.model.Item;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.List;

/**
 * @author Deeban Ramalingam
 * ItemDaoImpl performs CRUD operations for Item
 */
public class ItemDaoImpl extends HibernateDaoSupport implements ItemDao {

    /**
     * creates item in spring.database
     * @param item Item object
     */
    @Override
    public void create(Item item) {
        getHibernateTemplate().save(item);
    }

    /**
     * create item list
     * @param items item list
     */
    public void createList(List<Item> items) {
        for (Item item : items) {
            create(item);
        }
    }

    /**
     * read item by id
     * @param id item id
     * @return item by id
     */
    @Override
    public Item read(String id) {
        List list = getHibernateTemplate().find("from Item where item_id=?", new Object[]{id});
        return (list.size() > 0) ? (Item) list.get(0) : null;
    }

    /**
     * update item by database
     * @param item Item object
     */
    @Override
    public void update(Item item) {
        getHibernateTemplate().update(item);
    }

    /**
     * delete item by id
     * @param id item id
     */
    @Override
    public void delete(String id) {
        getHibernateTemplate().delete(getHibernateTemplate().get(Item.class, id));
    }

    /**
     * read item list
     * @param id user id
     * @return item list
     */
    public List<Item> readList(String id) {
        return (List<Item>) getHibernateTemplate().find("from Item where user_id=?", new Object[]{id});
    }
}
