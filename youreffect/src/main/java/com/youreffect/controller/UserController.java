package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.exception.LoginException;
import com.youreffect.exception.RegisterException;
import com.youreffect.model.User;
import com.youreffect.service.HashService;
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
     * registers user
     * @param data JSON from client
     * @return JSON to client
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody String data) {
        User user = gson.fromJson(data, User.class);
        System.out.println(user);
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        try {
            if(userService.exists(user.getUserId())) {
                throw new RegisterException("failed to register new user because username already exists");
            }
            userService.register(user);
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
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        try {
            if(!userService.exists(user.getUserId(), user.getPassword())) {
                throw new LoginException("login failed");
            }
            user = userService.login(user.getUserId(), user.getPassword());
            responseService.setMessage("login was successful");
        } catch (LoginException le) {
            responseService.setMessage(le.getMessage());
        }
        responseService.setData(user);
        user = null;
        return responseService.toString();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public @ResponseBody String view(@PathVariable String id) {
        user = userService.read(id);
        responseService.setData(user);
        responseService.setMessage("user returned");
        user = null;
        return responseService.toString();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        userService.update(user);
        responseService.setData(user);
        responseService.setMessage("user updated");
        user = null;
        return responseService.toString();
    }


    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public @ResponseBody String remove(@PathVariable String id) {
        userService.delete(id);
        responseService.setData(id);
        responseService.setMessage("user deleted");
        user = null;
        return responseService.toString();
    }
}