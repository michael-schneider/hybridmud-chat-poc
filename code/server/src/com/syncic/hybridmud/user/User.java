package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.Transmitter;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;
import java.util.logging.Logger;

public class User {
    private static final Logger LOGGER = Logger.getLogger(User.class.getName());

    private UUID id = UUID.randomUUID();
    private String username;
    private Date logindate;
    private final Transmitter transmitter;
    private UserState userState = null;

    private Locale locale;

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
        userState.receiveMessage(this, message);
    }

    public void setUserState(UserState userState) {
        this.userState = userState;
    }

    public Locale getLocale() { return locale; }

    public void setLocale(Locale locale) { this.locale = locale;  }


    public void logout() {
        transmitter.close();
    }

    public String toXml() {
        return MessageFormat.format("<user id=\"{0}\">{1}</user>", StringEscapeUtils.escapeXml11(id.toString()), StringEscapeUtils.escapeXml11(username));
    }

}
