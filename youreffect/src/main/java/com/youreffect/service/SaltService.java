package com.youreffect.service;

import org.springframework.security.crypto.keygen.KeyGenerators;

/**
 * @author Deeban Ramalingam
 * SaltService generates random salt for hashing purposes
 */
public class SaltService {

    /**
     * default constructor
     */
    public SaltService() {}

    /**
     * generate random salt for hashing purposes
     * @return randomly generated salt
     */
    public String generateSalt() {
        return KeyGenerators.string().generateKey();
    }

}
