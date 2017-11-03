package com.syncic.hybridmud.server;

import com.syncic.hybridmud.server.websocket.WebSocketConnection;

public interface ControllerState {
    // False means the user wants to disconnect
    public boolean receiveMessage(String message, WebSocketConnection webSocketConnection);
}
