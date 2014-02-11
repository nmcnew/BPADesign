package com.youreffect.controller;

import com.google.gson.Gson;
import com.youreffect.model.User;
import com.youreffect.service.HashService;
import com.youreffect.service.MailService;
import com.youreffect.service.ResponseService;
import com.youreffect.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Deeban Ramalingam
 * MailController handles all email requests
 */
@Controller
@RequestMapping("/mail")
public class MailController {

    private static final Logger logger = Logger.getLogger(MailController.class);

    /** mail operations */
    @Autowired
    private MailService mailService;

    @Autowired
    private Gson gson;

    /** provide a format for sending responses to clients */
    @Autowired
    private ResponseService responseService;

    @Autowired
    private UserService userService;

    @Autowired
    private User user;

    @Autowired
    private HashService hashService;

    @RequestMapping(value = "recall/{username}", method = RequestMethod.GET)
    public @ResponseBody String forgot(@PathVariable String username) {
        logger.info("GET /mail/recall/"+username);
        logger.info(username);
        user = userService.read(hashService.md5(username));
        logger.info(user);
        mailService.sendMail(user.getEmail(),"Your Effect - password recall","Your password code is " + user.getPassword());
        responseService.setData(user);
        responseService.setMessage("message successfully sent");
        user = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }
}
