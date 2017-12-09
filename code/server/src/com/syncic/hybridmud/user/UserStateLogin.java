package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.Date;
import java.util.ResourceBundle;

public class UserStateLogin implements UserState {
    private final ResourceBundle localeStrings;

    public UserStateLogin(User user) {
        localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
        user.send("<init>" + localeStrings.getString("motd") + "</init>");
        user.send("<login>" + localeStrings.getString("pleaseEnterYourName") + "</login>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        String username = message.trim();
        if (!Users.isValidUsername(username)) {
            user.send("<login type=\"error\">" + localeStrings.getString("errorUsernameNotValid") + "</login>");
        } else if (Users.getInstance().isUsernameInUse(username)) {
            user.send("<login type=\"error\">" + localeStrings.getString("errorUsernameInUse") + "</login>");
        } else {
            user.setLogindate(new Date());
            user.setUsername(username);

            user.send(MessageFormat.format("<login type=\"success\">" + localeStrings.getString("welcome") + "</login>", user.toXml()));
            user.setUserState(new UserStateChat(user));
        }
        return true;
    }
}
