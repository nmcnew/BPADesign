package com.youreffect.exception;

/**
 * @author Deeban Ramalingam
 * RegisterException thrown when an error occurs during register process
 */
public class RegisterException extends Exception {
    /**
     * construct exception with reason for error
     * @param message reason for error
     */
    public RegisterException(String message) {
        super(message);
    }
}
