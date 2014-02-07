package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.model.Item;
import com.youreffect.service.HashService;
import com.youreffect.service.ItemService;
import com.youreffect.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    /** abstract out user CRUD operations */
    @Autowired
    private ItemService itemService;

    /** hash away critical data */
    @Autowired
    private HashService hashService;

    /** convert JAVA objects into JSON */
    @Autowired
    private Gson gson;

    /** provide a format for sending responses to clients */
    @Autowired
    private ResponseService responseService;

    /**
     * adds item to user
     * @param data JSON from client
     * @return
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody String saveItem(@RequestBody String data) {
        item = gson.fromJson(data, Item.class);
        item.setItemId(hashService.md5(item.getName() + item.getEnergy() + item.getSpecs()));
        if(itemService.read(item.getItemId()) != null) {
            int oldQuantity = item.getQuantity();
            item = itemService.read(item.getItemId());
            item.setQuantity(oldQuantity + item.getQuantity());
            itemService.update(item);
        }
        else {
            itemService.create(item);
        }
        responseService.setData(item);
        responseService.setMessage("item successfully saved");
        item = null;
        return responseService.toString();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String view(@PathVariable String id) {
        item = itemService.read(id);
        responseService.setData(item);
        responseService.setMessage("item successfully returned");
        item = null;
        return responseService.toString();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        item = gson.fromJson(data, Item.class);
        itemService.update(item);
        responseService.setData(item);
        responseService.setMessage("item successfully updated");
        item = null;
        return responseService.toString();
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public @ResponseBody String delete(@PathVariable String id) {
        itemService.delete(id);
        responseService.setData(item);
        responseService.setMessage("item successfully deleted");
        item = null;
        return responseService.toString();
    }
}