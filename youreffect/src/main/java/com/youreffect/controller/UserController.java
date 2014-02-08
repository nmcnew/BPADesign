package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.exception.LoginException;
import com.youreffect.exception.RegisterException;
import com.youreffect.model.User;
import com.youreffect.service.ResponseService;
import com.youreffect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Deeban Ramalingam
 * UserController directs all CRUD operations pertaining to User based on the request URL
 */
@Controller
@RequestMapping("/user")
public class UserController {

    /** user reference */
    @Autowired
    private User user;

    /** abstract out user CRUD operations */
    @Autowired
    private UserService userService;

    /** convert JAVA objects into JSON */
    @Autowired
    private Gson gson;

    /** provide a format for sending responses to clients */
    @Autowired
    private ResponseService responseService;

    /**
     * registers user
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        try {
            user = userService.register(user);
            responseService.setMessage("new user successfully registered");
        } catch (RegisterException re) {
            responseService.setMessage(re.getMessage());
        }
        responseService.setData(user);
        user = null;
        return responseService.toString();
    }

    /**
     * logs in user
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody String login(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        try {
            userService.login(user);
            responseService.setMessage("user successfully logged in");
        } catch (LoginException le) {
            responseService.setMessage(le.getMessage());
        }
        responseService.setData(user);
        user = null;
        return responseService.toString();
    }

    /**
     * view item
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String view(@PathVariable String id) {
        user = userService.read(id);
        responseService.setData(user);
        responseService.setMessage("user returned");
        user = null;
        return responseService.toString();
    }

    /**
     * update item
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        userService.update(user);
        responseService.setData(user);
        responseService.setMessage("user updated");
        user = null;
        return responseService.toString();
    }

    /**
     * delete item
     * @param id item id
     * @return JSON to client
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public @ResponseBody String remove(@PathVariable String id) {
        userService.delete(id);
        responseService.setData(id);
        responseService.setMessage("user deleted");
        user = null;
        return responseService.toString();
    }
}