package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;

import java.text.MessageFormat;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<message>Welcome to the chat</message>");
        user.send("<message>type 'bye' to disconnect</message>");
    }

    @Override
    public boolean receiveMessage(String message, User user) {
        if (message.trim().equals("bye")) {
            user.send("<message>Bye!</message>");
            return false;
        }
        user.send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }
}
