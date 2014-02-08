package com.youreffect.model;


/**
 * @author Deeban Ramalingam
 * Item POJO
 */
public class Item {

    /** primary key item id for database indexing */
    private String itemId;
    /** foreign key user id */
    private String userId;
    /** item name */
    private String name;
    /** item energy */
    private String energy;
    /** item quantity */
    private int quantity;
    /** item specs */
    private String specs;
    /** date item was created */
    private String dateCreated;

    /**
     * get item id
     * @return item id
     */
    public String getItemId() {
        return itemId;
    }

    /**
     * set item id
     * @param itemId set item id to this
     */
    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    /**
     * get user id
     * @return user id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * set user id
     * @param userId set user id to this
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * get item name
     * @return item name
     */
    public String getName() {
        return name;
    }

    /**
     * set item name
     * @param name set item name to this
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * get item energy
     * @return item energy
     */
    public String getEnergy() {
        return energy;
    }

    /**
     * set item energy
     * @param energy set item energy to this
     */
    public void setEnergy(String energy) {
        this.energy = energy;
    }

    /**
     * get quantity of item
     * @return quantity of item
     */
    public int getQuantity () {
        return quantity;
    }

    /**
     * set quantity of item
     * @param quantity set quantity of item to this
     */
    public void setQuantity (int quantity) {
        this.quantity = quantity;
    }

    /**
     * get specs
     * @return specs
     */
    public String getSpecs() {
        return specs;
    }

    /**
     * set specs
     * @param specs set specs to this
     */
    public void setSpecs(String specs) {
        this.specs = specs;
    }

    /**
     * get date created
     * @return date created
     */
    public String getDateCreated() {
        return dateCreated;
    }

    /**
     * set date created
     * @param dateCreated set date created to this
     */
    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    /**
     * string representation of item
     * @return string representation of item
     */
    public String toString() {
        return String.format("Item[id=%s, userId='%s', name='%s', energy='%s', quantity='%s', dateCreated='%s', specs='%s']", itemId, userId, name, energy, quantity, dateCreated, specs);
    }
}
