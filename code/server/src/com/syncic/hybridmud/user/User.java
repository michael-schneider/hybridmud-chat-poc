package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.Transmitter;

import java.util.Date;
import java.util.UUID;
import java.util.logging.Logger;

public class User {
    private static final Logger LOGGER = Logger.getLogger(User.class.getName());

    private UUID id = UUID.randomUUID();
    private String username;
    private Date logindate;
    private final Transmitter transmitter;
    private UserState userState = null;

    public User(Transmitter transmitter) {
        this.transmitter = transmitter;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getLogindate() {
        return logindate;
    }

    public void setLogindate(Date logindate) {
        this.logindate = logindate;
    }

    public String getNetId() {
        return transmitter.getNetId();
    }

    public void send(String message) {
        transmitter.send(message);
    }

    public void receive(String message) {

    }

    public void setUserState(UserState userState) {
        this.userState = userState;
    }

    public void logout() {
        transmitter.close();
    }

}
