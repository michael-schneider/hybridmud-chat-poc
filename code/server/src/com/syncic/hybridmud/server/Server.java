package com.syncic.hybridmud.server;

import com.syncic.hybridmud.utils.Config;

import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Server {
    private static final Logger LOGGER = Logger.getLogger(Config.class.getName());

    public void startup() {
        try {
            int serverPort=Config.getInstance().getValueAsInt("server-port");
            ServerSocket server = new ServerSocket(serverPort);
            LOGGER.log(Level.INFO, "Server startet on Port {0}", String.valueOf(serverPort));
            while (true) {
                Socket client = server.accept();
                ClientHandler handler = new ClientHandler (client);
                handler.start();
            }
        }
        catch (Exception ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        }
    }
}
