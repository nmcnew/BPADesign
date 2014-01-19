package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.service.UserService;
import com.youreffect.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody String data) {
        Gson gson = new Gson();
        User user = gson.fromJson(data, User.class);
        UserService userService = new UserService();
        userService.registerUser(user);
        return user.toString();
    }
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public @ResponseBody String login(@RequestBody String data) {
        Gson gson = new Gson();
        User user = gson.fromJson(data, User.class);
        UserService userService = new UserService();
        userService.loginUser(user);
        return user.toString();
    }
}