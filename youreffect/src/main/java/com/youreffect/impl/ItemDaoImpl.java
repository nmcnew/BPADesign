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
     * update item by properties
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

}
