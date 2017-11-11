package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;

import java.text.MessageFormat;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<server>Welcome to the chat</server>");
        user.send("<server>type 'bye' to disconnect</server>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        if (message.trim().equals("bye")) {
            user.send("<server>Bye!</server>");
            return false;
        }
        user.send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }
}
