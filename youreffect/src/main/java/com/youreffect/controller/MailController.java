package com.youreffect.controller;

import com.youreffect.model.User;
import com.youreffect.service.HashService;
import com.youreffect.service.MailService;
import com.youreffect.service.ResponseService;
import com.youreffect.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

    /** provide a format for sending responses to clients */
    @Autowired
    private ResponseService responseService;

    /** perform user operations */
    @Autowired
    private UserService userService;

    /** user reference */
    @Autowired
    private User user;

    /** hash away critical data */
    @Autowired
    private HashService hashService;

    /**
     * uses username to send email to client with password reset code
     * @param username user username
     * @return JSON to client
     */
    @RequestMapping(value = "recall/{username}", method = RequestMethod.GET)
    public @ResponseBody String forgot(@PathVariable String username) {
        logger.info("GET /mail/recall/"+username);
        user = userService.read(hashService.md5(username));
        mailService.sendMail(user.getEmail(),"Your Effect - password recall","Your password reset code is " + user.getPassword());
        responseService.setData(user);
        responseService.setMessage("message successfully sent");
        user = null;
        logger.info(responseService.toString());
        return responseService.toString();
    }
}
