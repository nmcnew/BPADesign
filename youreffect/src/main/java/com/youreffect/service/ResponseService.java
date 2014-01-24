package com.youreffect.service;

import com.google.gson.Gson;

/**
 * @author Deeban Ramalingam
 * ResponseService provides feedback for client
 */
public class ResponseService {
    /** message to be read by client */
    private String message;
    /** holds JSON-ified POJO to be accessed by client-side */
    private Object data;

    /**
     * constructs ResponseService with message and data
     * @param message to be read by client
     * @param data JSON-ified POJO to be accessed by client-side
     */
    public ResponseService (String message, Object data) {
        this.message = message;
        this.data = data;
    }

    /**
     * JSON representation of POJO
     * @return JSON representation of POJO
     */
    public String toString() {
        return new Gson().toJson(this);
    }

    /**
     * get data
     * @return data
     */
    public Object getData() {
        return data;
    }

    /**
     * set data
     * @param data set data to this
     */
    public void setData(Object data) {
        this.data = data;
    }

    /**
     * get message
     * @return message
     */
    public String getMessage() {
        return message;
    }

    /**
     * set message
     * @param message set message to this
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
