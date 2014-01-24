package com.youreffect.exception;

/**
 * @author Deeban Ramalingam
 * LoginException thrown when an error occurs during login process
 */
public class LoginException extends Exception {
    /**
     * construct exception with reason for error
     * @param message reason for error
     */
    public LoginException(String message) {
        super(message);
    }
}
