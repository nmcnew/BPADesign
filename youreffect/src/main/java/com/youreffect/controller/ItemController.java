package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.model.Item;
import com.youreffect.service.HashService;
import com.youreffect.service.ItemService;
import com.youreffect.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Deeban Ramalingam
 * ItemController directs all CRUD operations pertaining to Item based on the request URL
 */
@Controller
@RequestMapping("/item")
public class ItemController {

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
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String saveItem(@RequestBody String data) {
        Item item = gson.fromJson(data, Item.class);
        item.setItemId(hashService.md5(item.getName() + item.getEnergy() + item.getSpecsStr()));
        itemService.insertItem(item);
        responseService.setData(item);
        responseService.setMessage("item successfully saved");
        return responseService.toString();
    }
}