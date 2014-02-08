package com.youreffect.impl;

import com.youreffect.dao.UserDao;
import com.youreffect.model.User;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.List;

/**
 * @author Deeban Ramalingam
 * UserDaoImpl performs CRUD operations for User
 */
public class UserDaoImpl extends HibernateDaoSupport implements UserDao {

    /**
     * creates user in spring.database
     * @param user User object
     */
    @Override
    public void createUser(User user) {
        getHibernateTemplate().save(user);
    }

    /**
     * read user by id and hashed password
     * @param id user id
     * @param password user password
     * @return User object
     */
    @Override
    public User readUser(String id, String password) {
        List list = getHibernateTemplate().find("from User where user_id=? and password=?",new Object[]{id,password});
        return (list.size() > 0) ? (User) list.get(0) : null;
    }

    /**
     * read user by id
     * @param id user reference
     * @return user by id
     */
    @Override
    public User readUser(String id) {
        List list = getHibernateTemplate().find("from User where user_id=?",new Object[]{id});
        return (list.size() > 0) ? (User) list.get(0) : null;
    }

    /**
     * update user by properties
     * @param user User reference
     */
    @Override
    public void updateUser(User user) {
        getHibernateTemplate().update(user);
    }

    /**
     * delete user by id
     * @param id user reference
     */
    @Override
    public void deleteUser(String id) {
        getHibernateTemplate().delete(getHibernateTemplate().get(User.class,id));
    }

}