package com.youreffect.service;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

/**
 * @author Deeban Ramalingam
 * MailService performs mail-related tasks
 */
public class MailService {

    /** mail client */
    private MailSender mailSender;
    /** server e-mail sender address */
    private String from;

    /**
     * construct with server e-mail sender address initialized
     * @param from server e-mail sender address
     */
    public MailService(String from){
        this.from = from;
    }

    /**
     * set mail client
     * @param mailSender set mail client to this
     */
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * send e-mail
     * @param to recipient address
     * @param subject subject of email
     * @param msg content of email
     */
    public void sendMail(String to, String subject, String msg) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(msg);
        mailSender.send(message);
    }
}
