package com.youreffect.model;


/**
 * @author Deeban Ramalingam
 * Item POJO
 */
public class Item {

    private String itemId;
    private String userId;
    private String name;
    private String energy;
    private int quantity;
    private String specs;
    private String dateCreated;

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnergy() {
        return energy;
    }

    public void setEnergy(String energy) {
        this.energy = energy;
    }

    public int getQuantity () {
        return quantity;
    }

    public void setQuantity (int quantity) {
        this.quantity = quantity;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public String toString() {
        return String.format("Item[id=%s, userId='%s', name='%s', energy='%s', quantity='%s', dateCreated='%s', specs='%s']", itemId, userId, name, energy, quantity, dateCreated, specs);
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }
}
