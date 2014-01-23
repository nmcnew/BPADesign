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

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HashService hashService;

    @Autowired
    private Gson gson;

    @Autowired
    private ResponseService responseService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody String data) {
        //creates user from client data
        User user = gson.fromJson(data, User.class);
        //hashes username and password
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        try {
            //if user already exists
            if(userService.exists(user.getUserId())) {
                throw new RegisterException("failed to register new user because username already exists");
            }
            //register new user
            userService.registerUser(user);
            responseService.setMessage("new user successfully registered");
        } catch (RegisterException re) {
            responseService.setMessage(re.getMessage());
        }
        responseService.setData(user);
        return responseService.toString();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody String login(@RequestBody String data) {
        User user = gson.fromJson(data, User.class);
        user.setUserId(hashService.md5(user.getUsername()));
        user.setPassword(hashService.md5(user.getPassword()));
        try {
            if(!userService.exists(user.getUserId(), user.getPassword())) {
                throw new LoginException("login failed");
            }
            user = userService.loginUser(user.getUserId(), user.getPassword());
            responseService.setMessage("login was successful");
        } catch (LoginException le) {
            responseService.setMessage(le.getMessage());
        }
        responseService.setData(user);
        return responseService.toString();
    }
}