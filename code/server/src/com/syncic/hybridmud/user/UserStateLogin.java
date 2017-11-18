package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.Date;

    public class UserStateLogin implements UserState {

    public UserStateLogin(User user) {
        user.send("<init>Welcome to HybridMud</init>");
        user.send("<login>Please enter your name</login>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        String username = message.trim();
        if (!Users.isValidUsername(username)) {
            user.send("<login type=\"error\">Username is not valid. Please reenter.</login>");
        } else if (Users.getInstance().isUsernameInUse(username)) {
            user.send("<login type=\"error\">Username is in use, please use a different one.</login>");
        }else {
            user.setLogindate(new Date());
            user.setUsername(username);

            user.send(MessageFormat.format("<login type=\"success\">Welcome {0}</login>", user.toXml()));
            user.setUserState(new UserStateChat(user));
        }
        return true;
    }
}
