package com.syncic.hybridmud.server;

import com.syncic.hybridmud.world.User;
import com.syncic.hybridmud.world.Users;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.text.MessageFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientController extends Thread {
    private static final Logger LOGGER = Logger.getLogger(ClientController.class.getName());

    private ControllerState controllerState;
    private final User currentUser;
    private final Socket socket;

    ClientController(Socket socket) {
        this.socket = socket;
        this.currentUser = new User();
        currentUser.setTransmitter(new WebSocketTransmitter(socket));
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setControllerState(ControllerStateChat controllerState) {
        this.controllerState = controllerState;
    }

    public void run() {
        LOGGER.log(Level.INFO, MessageFormat.format("Client {0} connected", getCurrentUser().getNetId()));

        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            currentUser.send("<message>Welcome to HybridMud</message>");

            controllerState = new ControllerStateLogin(this);
            while (true) {
                String line = reader.readLine();
                final boolean continueSession = controllerState.receiveMessage(line.trim(), this);
                if (!continueSession) {
                    break;
                }
            }
            currentUser.send("<message>Bye!</message>");
            LOGGER.log(Level.INFO, MessageFormat.format("Client {0} logged out", getCurrentUser().getNetId()));
        } catch (IOException ex) {
            LOGGER.log(Level.INFO, MessageFormat.format("Client {0} disconnected. {1}", getCurrentUser().getNetId()), ex);
        } finally {
            try {
                if (reader != null) reader.close();
                currentUser.logout();
                Users.getInstance().removeUser(currentUser);
            } catch (IOException ex) {
                LOGGER.log(Level.SEVERE, ex.toString(), ex);
            }
        }
    }
}

