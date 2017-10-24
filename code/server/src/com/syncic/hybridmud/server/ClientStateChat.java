package com.syncic.hybridmud.server;

import java.text.MessageFormat;

public class ClientStateChat implements ClientState {

    public ClientStateChat(ClientHandler clientHandler) {
        clientHandler.writeToStream("<message>Welcome to the chat</message>");
        clientHandler.writeToStream("<message>type 'bye' to disconnect</message>");
    }

    @Override
    public boolean receiveMessage(String message, ClientHandler clientHandler) {
        if (message.trim().equals("bye")) {
            return false;
        }
        clientHandler.writeToStream(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }
}
