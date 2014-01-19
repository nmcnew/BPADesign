package com.youreffect.service;

import com.google.gson.Gson;

public class ResponseService {
    private String message;
    private Object data;
    public ResponseService (String message, Object data) {
        this.message = message;
        this.data = data;
    }
    public String toString() {
        return new Gson().toJson(this);
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
