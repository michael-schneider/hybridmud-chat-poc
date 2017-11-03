package com.syncic.hybridmud.server;

import com.syncic.hybridmud.server.websocket.WebSocketConnection;

import java.text.MessageFormat;

public class ControllerStateChat implements ControllerState {

    public ControllerStateChat(WebSocketConnection webSocketConnection) {
        webSocketConnection.getCurrentUser().send("<message>Welcome to the chat</message>");
        webSocketConnection.getCurrentUser().send("<message>type 'bye' to disconnect</message>");
    }

    @Override
    public boolean receiveMessage(String message, WebSocketConnection webSocketConnection) {
        if (message.trim().equals("bye")) {
            webSocketConnection.getCurrentUser().send("<message>Bye!</message>");
            return false;
        }
        webSocketConnection.getCurrentUser().send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }
}
