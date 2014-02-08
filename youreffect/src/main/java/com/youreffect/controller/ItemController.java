package com.youreffect.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.youreffect.model.Item;
import com.youreffect.service.ItemService;
import com.youreffect.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Deeban Ramalingam
 * ItemController directs all CRUD operations pertaining to Item based on the request URL
 */
@Controller
@RequestMapping("/item")
public class ItemController {

    /** item reference */
    @Autowired
    private Item item;

    /** item list reference */
    @Autowired
    private List<Item> items;

    /** abstract out user CRUD operations */
    @Autowired
    private ItemService itemService;

    /** convert JAVA objects into JSON */
    @Autowired
    private Gson gson;

    /** provide a format for sending responses to clients */
    @Autowired
    private ResponseService responseService;

    /**
     * creates item
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody String saveItem(@RequestBody String data) {
        item = gson.fromJson(data, Item.class);
        item = itemService.create(item);
        responseService.setData(item);
        responseService.setMessage("item successfully saved");
        item = null;
        return responseService.toString();
    }

    /**
     * creates list of items
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/list/create", method = RequestMethod.POST)
    public @ResponseBody String saveItemList(@RequestBody String data) {
        System.out.println(data);
        items = gson.fromJson(data, new TypeToken<ArrayList<Item>>() {}.getType());
        items = itemService.createList(items);
        responseService.setData(items);
        responseService.setMessage("items successfully saved");
        items = null;
        return responseService.toString();
    }

    /**
     * views item
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String view(@PathVariable String id) {
        item = itemService.read(id);
        responseService.setData(item);
        responseService.setMessage("item successfully returned");
        item = null;
        return responseService.toString();
    }

    /**
     * views list of items
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/list/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String listView(@PathVariable String id) {
        items = itemService.readList(id);
        responseService.setData(items);
        responseService.setMessage("items successfully returned");
        items = null;
        return responseService.toString();
    }

    /**
     * update item
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        item = gson.fromJson(data, Item.class);
        itemService.update(item);
        responseService.setData(item);
        responseService.setMessage("item successfully updated");
        item = null;
        return responseService.toString();
    }

    /**
     * delete item
     * @param id JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public @ResponseBody String delete(@PathVariable String id) {
        itemService.delete(id);
        responseService.setData(item);
        responseService.setMessage("item successfully deleted");
        item = null;
        return responseService.toString();
    }
}