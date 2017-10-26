package com.syncic.hybridmud.server;

import java.text.MessageFormat;

public class ControllerStateChat implements ControllerState {

    public ControllerStateChat(ClientController clientController) {
        clientController.getCurrentUser().send("<message>Welcome to the chat</message>");
        clientController.getCurrentUser().send("<message>type 'bye' to disconnect</message>");
    }

    @Override
    public boolean receiveMessage(String message, ClientController clientController) {
        if (message.trim().equals("bye")) {
            clientController.getCurrentUser().send("<message>Bye!</message>");
            return false;
        }
        clientController.getCurrentUser().send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }
}
