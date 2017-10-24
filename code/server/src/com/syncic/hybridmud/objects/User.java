package com.syncic.hybridmud.objects;

import com.syncic.hybridmud.server.ClientHandler;

import java.util.Date;
import java.util.UUID;

public class User {
    private final UUID id = UUID.randomUUID();
    private final String username;
    private final Date logindate;
    private final String ip;
    private ClientHandler clientHandler;

    public User(String username, Date logindate, String ip) {
        this.username = username;
        this.logindate = logindate;
        this.ip = ip;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Date getLogindate() {
        return logindate;
    }

    public String getIp() {
        return ip;
    }

    public ClientHandler getClientHandler() {
        return clientHandler;
    }

    public void setClientHandler(ClientHandler clientHandler) {
        this.clientHandler = clientHandler;
    }
}
