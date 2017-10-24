package com.syncic.hybridmud.server;

import com.syncic.hybridmud.objects.User;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.text.MessageFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientHandler extends Thread {
    private static final Logger LOGGER = Logger.getLogger(ClientHandler.class.getName());
    private final Socket socket;
    private PrintWriter writer;
    private ClientState clientState;
    private User user;

    ClientHandler(Socket socket) {
        this.socket = socket;
    }

    public void writeToStream(String message) {
        writer.println(message);
    }

    public void setClientState(ClientState clientState) {
        this.clientState = clientState;
    }

    public User getUser() {
        return user;
    }

    public Socket getSocket() {
        return socket;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void run() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            writer = new PrintWriter(socket.getOutputStream(), true);
            writeToStream("<message>Welcome to HybridMud</message>");

            clientState = new ClientStateLogin(this);
            while (true) {
                String line = reader.readLine();
                final boolean continueSession = clientState.receiveMessage(line.trim(), this);
                if (!continueSession) {
                    break;
                }
            }
            writeToStream("<message>Bye!</message>");
        } catch (Exception ex) {
            LOGGER.log(Level.INFO, MessageFormat.format("Client disconnected. {0}", ex.toString()), ex);
        } finally {
            try {
                socket.close();
            } catch (Exception ex) {
                LOGGER.log(Level.INFO, ex.toString(), ex);
            }
        }
    }


}

