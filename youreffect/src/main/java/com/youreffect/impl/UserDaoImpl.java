package com.youreffect.impl;

import com.youreffect.dao.UserDao;
import com.youreffect.model.User;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

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
        return getHibernateTemplate().get(User.class, new Object[]{id,password});
    }

    /**
     * read user by id
     * @param id user reference
     * @return user by id
     */
    @Override
    public User readUser(String id) {
        return getHibernateTemplate().get(User.class,id);
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
