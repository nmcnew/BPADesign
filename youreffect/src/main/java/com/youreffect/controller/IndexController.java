package com.youreffect.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Deeban Ramalingam
 * IndexController redirects web ROOT to /public/ directory
 */
@Controller
@RequestMapping("/")
public class IndexController {

    private static final Logger logger = Logger.getLogger(IndexController.class);

    /**
     * redirects web ROOT to /public/ directory
     * @return request URL to public
     */
	@RequestMapping(method = RequestMethod.GET)
	public String index() {
        logger.info("redirecting to public");
        return "redirect:/public/";
	}
}