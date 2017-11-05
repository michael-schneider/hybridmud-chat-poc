package com.syncic.hybridmud.server.websocket;

import com.syncic.hybridmud.server.Transmitter;
import org.java_websocket.WebSocket;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

public class WebSocketTransmitter implements Transmitter {
    private static final Logger LOGGER = Logger.getLogger(WebSocketTransmitter.class.getName());
    private final WebSocket webSocket;

    public WebSocketTransmitter(WebSocket webSocket) {
        this.webSocket = webSocket;
    }

    @Override
    public void send(String message) {
        // We have to JSONIFY it!!! RXJS wants us to!
        webSocket.send("\""+message.replace("\"","\\\"")+"\"");
    }

    @Override
    public String getNetId() {
        return webSocket.getRemoteSocketAddress().toString();
    }

    @Override
    public void close() {
        webSocket.close();
    }
}
