package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.model.User;
import com.youreffect.service.HashService;
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

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody String data) {
        Gson gson = new Gson();
        User user = gson.fromJson(data, User.class);
        user.setUserId(hashService.md5(user.getUsername()+user.getPassword()));
        userService.registerUser(user);
        return user.toString();
    }
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public @ResponseBody String login(@RequestBody String data) {
        Gson gson = new Gson();
        User user = gson.fromJson(data, User.class);
        userService.loginUser(user);
        return user.toString();
    }
}