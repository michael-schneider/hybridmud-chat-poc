package com.syncic.hybridmud.user;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;

public interface UserState {
    // False means the user wants to disconnect
    public boolean receiveMessage(String message, User user);
}
