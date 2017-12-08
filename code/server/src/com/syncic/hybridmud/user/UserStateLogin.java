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
        user.send(MessageFormat.format("<init>{0}</init>", localeStrings.getString("motd")));
        user.send(MessageFormat.format("<login>{0}</login>", localeStrings.getString("pleaseEnterYourName")));
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        String username = message.trim();
        if (!Users.isValidUsername(username)) {
            user.send(MessageFormat.format("<login type=\"error\">{0}</login>", localeStrings.getString("errorUsernameNotValid")));
        } else if (Users.getInstance().isUsernameInUse(username)) {
            user.send(MessageFormat.format("<login type=\"error\">{0}</login>", localeStrings.getString("errorUsernameInUse")));
        } else {
            user.setLogindate(new Date());
            user.setUsername(username);

            user.send(MessageFormat.format("<login type=\"success\">" + localeStrings.getString("welcome") + "</login>", user.toXml()));
            user.setUserState(new UserStateChat(user));
        }
        return true;
    }
}
