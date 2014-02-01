package com.youreffect.model;

import java.util.HashMap;
import java.util.Map;

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
    private HashMap<String,Object> specs;

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

    public HashMap<String, Object> getSpecs() {
        return specs;
    }

    public String getSpecsStr() {
        String s = "[";
        for (Map.Entry<String,Object> pair : specs.entrySet()) {
            s += pair.getKey() + " => " + pair.getValue() + ", ";
        }
        s = s.substring(0, s.length() - 2) + "]";
        return s;
    }

    public void setSpecs(HashMap<String, Object> specs) {
        this.specs = specs;
    }

    public int getQuantity () {
        return quantity;
    }

    public void setQuantity (int quantity) {
        this.quantity = quantity;
    }

    public void addToQuantity (int toAdd) {
        this.quantity += toAdd;
    }

    public void subFromQuantity (int subFrom) {
        this.quantity -= subFrom;
    }

    public String toString() {
        return String.format("Item[id=%s, userId='%s', name='%s', energy='%s', quantity='%s', specs='%s']", itemId, userId, name, energy, quantity, getSpecsStr());
    }
}
