package com.syncic.hybridmud.server;

import com.syncic.hybridmud.utils.Config;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

public class WebSocketServer extends Thread {
    private static final Logger LOGGER = Logger.getLogger(WebSocketServer.class.getName());
    private ServerSocket server;

    public void run() {
        try {
            final int serverPort = Config.getInstance().getValueAsInt("server-port");
            server = new ServerSocket(serverPort);
            LOGGER.log(Level.INFO, "WebSocketServer started on Port {0}", String.valueOf(serverPort));
            while (true) {
                final Socket socket = server.accept();
                final ClientController clientController = new ClientController(socket);
                clientController.start();
            }
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        }
    }

    public void shutdown() {
        LOGGER.log(Level.INFO, "WebSocketServer stopping");
        try {
            server.close();
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        }
    }
}
