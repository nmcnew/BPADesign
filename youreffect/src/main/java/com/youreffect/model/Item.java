package com.youreffect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by deebanramalingam on 1/24/14.
 */
@Document(collection = "items")
public class Item {

    @Id
    private String itemId;
    private String userId;
    private String name;
    private String energy;
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

    public String toString() {
        return String.format("Item[id=%s, userId='%s', name='%s', energy='%s'", itemId, userId, name, energy);
    }
}
