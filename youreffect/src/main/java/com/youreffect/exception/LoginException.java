package com.youreffect.exception;

public class LoginException extends Exception {
    public LoginException() {
    }

    public LoginException(String s) {
        super(s);
    }

    public LoginException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public LoginException(Throwable throwable) {
        super(throwable);
    }
}
