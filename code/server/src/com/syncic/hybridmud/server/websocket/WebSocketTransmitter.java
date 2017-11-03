package com.syncic.hybridmud.server.websocket;

import com.syncic.hybridmud.server.Transmitter;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

public class WebSocketTransmitter implements Transmitter {
    private static final Logger LOGGER = Logger.getLogger(WebSocketTransmitter.class.getName());
    private final Socket socket;
    private PrintWriter writer = null;

    public WebSocketTransmitter(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void send(String message) {
        if (writer == null) {
            if (socket == null) {
                LOGGER.log(Level.SEVERE, "send called without socket!");
                return;
            }
            try {
                writer = new PrintWriter(socket.getOutputStream(), true);
            } catch (IOException ex) {
                LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        writer.println(message);
    }

    @Override
    public String getNetId() {
        String ip;
        if (socket == null) {
            ip = "Not Connected";
        } else {
            ip = socket.getRemoteSocketAddress().toString();
        }
        return ip;
    }

    @Override
    public void close() {
        try {
            socket.close();
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        }
    }
}
