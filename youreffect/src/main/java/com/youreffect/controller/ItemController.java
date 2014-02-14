package com.youreffect.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.youreffect.model.Item;
import com.youreffect.service.ItemService;
import com.youreffect.service.ResponseService;
import org.apache.log4j.Logger;
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

    private static final Logger logger = Logger.getLogger(ItemController.class);

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
     * creates item in database
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody String saveItem(@RequestBody String data) {
        logger.info("POST /item/create\n"+data);
        item = gson.fromJson(data, Item.class);
        item = itemService.create(item);
        responseService.setData(item);
        responseService.setMessage("item successfully saved");
        item = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }

    /**
     * creates list of items in database
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/list/create", method = RequestMethod.POST)
    public @ResponseBody String saveItemList(@RequestBody String data) {
        logger.info("POST /item/list/create\n"+data);
        items = gson.fromJson(data, new TypeToken<ArrayList<Item>>() {}.getType());
        items = itemService.createList(items);
        responseService.setData(items);
        responseService.setMessage("items successfully saved");
        items = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }

    /**
     * views item in database
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String view(@PathVariable String id) {
        logger.info("GET /item/view/"+id);
        item = itemService.read(id);
        responseService.setData(item);
        if (item == null) {
            responseService.setMessage("no item returned");
        }
        else {
            responseService.setMessage("item returned");
        }
        item = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }

    /**
     * views list of items in database
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/list/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String listView(@PathVariable String id) {
        logger.info("GET /item/list/view/"+id);
        items = itemService.readList(id);
        responseService.setData(items);
        responseService.setMessage(items.size() + " item(s) successfully returned");
        items = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }

    /**
     * update item in database
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        logger.info("POST /item/update\n"+data);
        item = gson.fromJson(data, Item.class);
        itemService.update(item);
        responseService.setData(item);
        responseService.setMessage("item successfully updated");
        item = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }

    /**
     * delete item in database
     * @param id JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public @ResponseBody String delete(@PathVariable String id) {
        logger.info("POST /item/delete/"+id);
        itemService.delete(id);
        responseService.setData(item);
        responseService.setMessage("item successfully deleted");
        item = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }
}