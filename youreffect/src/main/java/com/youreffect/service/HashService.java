package com.youreffect.service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author Deeban Ramalingam
 * HashService hashes away critical data using a MD5 + salt
 */
public class HashService {

    /**
     * default constructor
     */
    public HashService(){}

    /** prepended to password prior to hashing to prevent dictionary attacks */
    private String salt;

    /**
     * hashes a string with MD5
     * @param input string value to hash
     * @return hashed string
     */
    public String md5 (String input) {
        String md5 = null;
        if(null == input) return null;
        try {
            input = salt + input;
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(input.getBytes(), 0, input.length());
            md5 = new BigInteger(1, digest.digest()).toString(16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return md5;
    }

    /**
     * set salt
     * @param salt set salt with this
     */
    public void setSalt(String salt) {
        this.salt = salt;
    }
}
