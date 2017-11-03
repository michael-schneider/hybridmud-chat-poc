package com.syncic.hybridmud;

import com.syncic.hybridmud.server.websocket.MudWebSocketServer;
import com.syncic.hybridmud.utils.Config;
import org.java_websocket.WebSocketImpl;

import java.net.UnknownHostException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Starter {
    private static final Logger LOGGER = Logger.getLogger(MudWebSocketServer.class.getName());

    public static void main(String[] args) {

        try {
            WebSocketImpl.DEBUG = true;
            final int websocketServerPort = Config.getInstance().getValueAsInt("websocket-server-port");
            new MudWebSocketServer(websocketServerPort).start();
        } catch (UnknownHostException e) {
            LOGGER.log(Level.SEVERE, e.getMessage(), e);
        }
    }
}

