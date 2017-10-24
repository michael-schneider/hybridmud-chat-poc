package com.syncic.hybridmud.server;

public interface ClientState {
    // False means the user wants to disconnect
    public boolean receiveMessage(String message, ClientHandler clientHandler);
}
