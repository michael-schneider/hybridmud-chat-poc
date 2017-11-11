package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;

import java.text.MessageFormat;
import java.util.Date;

public class UserStateLogin implements UserState {

    public UserStateLogin(User user) {
        user.send("<server subsystem=\"server\">Welcome to HybridMud</server>");
        user.send("<server subsystem=\"server\">Please enter your name</server>");
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

            user.send(MessageFormat.format("<login type=\"success\">Welcome <user id=\"{0}\">{1}</user></login  >", user.getId(), user.getUsername()));
            user.setUserState(new UserStateChat(user));
        }
        return true;
    }
}
