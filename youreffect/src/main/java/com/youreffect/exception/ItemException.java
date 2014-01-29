package com.youreffect.exception;

/**
 * Created by deebanramalingam on 1/28/14.
 */
public class ItemException extends Exception {
    /**
     * construct exception with reason for error
     * @param message reason for error
     */
    public ItemException(String message) {
        super(message);
    }
}
