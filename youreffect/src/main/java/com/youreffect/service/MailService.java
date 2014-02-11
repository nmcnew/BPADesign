package com.youreffect.service;

import com.youreffect.impl.UserDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

/**
 * @author Deeban Ramalingam
 * MailService performs mail-related tasks
 */
public class MailService {

    @Autowired
    private UserDaoImpl userDaoImpl;
    private MailSender mailSender;
    private String from;

    public MailService(String from){
        this.from = from;
    }

    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String to, String subject, String msg) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(msg);
        mailSender.send(message);
    }
}
