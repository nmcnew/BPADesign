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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

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
            userService.registerUser(user);
            user.setDateRegistered(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()));
            responseService.setMessage("new user successfully registered");
        } catch (RegisterException re) {
            responseService.setMessage(re.getMessage());
        }
        responseService.setData(user);
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
            user = userService.loginUser(user.getUserId(), user.getPassword());
            user.getDatesLoggedIn().add(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()));
            responseService.setMessage("login was successful");
        } catch (LoginException le) {
            responseService.setMessage(le.getMessage());
        }
        responseService.setData(user);
        return responseService.toString();
    }

    @RequestMapping(value = "/view", method = RequestMethod.POST)
    public @ResponseBody String view(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        try {
            if(!userService.exists(user.getUserId(), user.getPassword())) {
                throw new LoginException("user does not exist");
            }
            user = userService.loginUser(user.getUserId(), user.getPassword());
            responseService.setMessage("user found");
        } catch (LoginException le) {
            responseService.setMessage(le.getMessage());
        }
        responseService.setData(user);
        return responseService.toString();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody String update(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        userService.update(user);
        responseService.setData(user);
        responseService.setMessage("user updated");
        return responseService.toString();
    }


    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public @ResponseBody String remove(@RequestBody String data) {
        user = gson.fromJson(data, User.class);
        userService.remove(user.getUserId(), user.getPassword());
        responseService.setData(user);
        responseService.setMessage("user deleted");
        return responseService.toString();
    }
}