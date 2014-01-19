package com.youreffect.exception;

public class RegisterException extends Exception {
    public RegisterException() {
    }

    public RegisterException(String s) {
        super(s);
    }

    public RegisterException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public RegisterException(Throwable throwable) {
        super(throwable);
    }
}
