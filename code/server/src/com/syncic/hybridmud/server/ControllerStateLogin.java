package com.syncic.hybridmud.server;

import com.syncic.hybridmud.server.websocket.WebSocketConnection;
import com.syncic.hybridmud.world.Users;

import java.text.MessageFormat;
import java.util.Date;

public class ControllerStateLogin implements ControllerState {

    public ControllerStateLogin(WebSocketConnection webSocketConnection) {
        webSocketConnection.getCurrentUser().send("<message>Welcome to HybridMud</message>");
        webSocketConnection.getCurrentUser().send("<message>Please enter your name</message>");
    }

    @Override
    public boolean receiveMessage(String message, WebSocketConnection webSocketConnection) {
        String username = message.trim();
        if (!Users.isValidUsername(username)) {
            webSocketConnection.getCurrentUser().send("<error>Username is not valid. Please reenter</error>");
        } else if (Users.getInstance().isUsernameInUse(username)) {
            webSocketConnection.getCurrentUser().send("<error>Username is in use, please use a different one.</error>");
        }else {
            webSocketConnection.getCurrentUser().setLogindate(new Date());
            webSocketConnection.getCurrentUser().setUsername(username);

            Users.getInstance().addUser(webSocketConnection.getCurrentUser());

            webSocketConnection.getCurrentUser().send(MessageFormat.format("<message>Welcome <user id=\"{0}\">{1}</user></message>", webSocketConnection.getCurrentUser().getId(), webSocketConnection.getCurrentUser().getUsername()));
            webSocketConnection.setControllerState(new ControllerStateChat(webSocketConnection));
        }
        return true;
    }


}
