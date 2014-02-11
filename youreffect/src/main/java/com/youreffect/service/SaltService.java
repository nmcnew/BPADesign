package com.youreffect.service;

import org.springframework.security.crypto.keygen.KeyGenerators;

public class SaltService {

    public SaltService() {}

    public String generateSalt() {
        return KeyGenerators.string().generateKey();
    }

}
