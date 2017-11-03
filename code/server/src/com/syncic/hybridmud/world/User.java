package com.syncic.hybridmud.world;

import com.syncic.hybridmud.server.Transmitter;

import java.util.Date;
import java.util.UUID;
import java.util.logging.Logger;

public class User {
    private static final Logger LOGGER = Logger.getLogger(User.class.getName());

    private UUID id = UUID.randomUUID();
    private String username;
    private Date logindate;
    private Transmitter transmitter;


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

    public void setTransmitter(Transmitter transmitter) {
        this.transmitter = transmitter;
    }

    public String getNetId() {
       return transmitter.getNetId();
    }

    public void send(String message) {
        transmitter.send(message);
    }

    public void logout() {
        transmitter.close();
    }

}
