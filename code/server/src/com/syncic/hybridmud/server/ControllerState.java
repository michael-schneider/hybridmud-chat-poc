package com.syncic.hybridmud.server;

public interface ControllerState {
    // False means the user wants to disconnect
    public boolean receiveMessage(String message, ClientController clientController);
}
