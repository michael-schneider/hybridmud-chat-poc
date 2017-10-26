package com.syncic.hybridmud.server;

import com.syncic.hybridmud.world.User;
import com.syncic.hybridmud.world.Users;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.MessageFormat;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ClientController extends Thread {
    private static final Logger LOGGER = Logger.getLogger(ClientController.class.getName());
    private final static String MAGIC_WEBSOCKET_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

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

            if (!wsHandshake(reader)) {
                LOGGER.log(Level.SEVERE, MessageFormat.format("Websocket Handshake for {0} failed", getCurrentUser().getNetId()));
                currentUser.send("HTTP/1.1 400 Bad Request\r\n");
                return;
            }

            LOGGER.log(Level.INFO, MessageFormat.format("Websocket Handshake for {0} successful", getCurrentUser().getNetId()));
            controllerState = new ControllerStateLogin(this);
            while (true) {
                final String line = reader.readLine();
                final boolean continueSession = controllerState.receiveMessage(line.trim(), this);
                if (!continueSession) {
                    break;
                }
            }
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

    private boolean wsHandshake(BufferedReader reader) {
        boolean success = true;
        String requestHeader = "";
        String line;
        try {
            do {
                line = reader.readLine();
                requestHeader += line+"\n";
            } while (!"".equals(line));

            Matcher matcher = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(requestHeader);
            if (matcher.find()) {
                String acceptKey=getKey(matcher.group(1));
                String response = "HTTP/1.1 101 Switching Protocols\r\n+" +
                        "Upgrade: websocket\r\n" +
                        "Connection: Upgrade\r\n" +
                        "Sec-WebSocket-Accept: "+acceptKey;
                currentUser.send(response);
            } else {
                success = false;
            }

        } catch (IOException|NoSuchAlgorithmException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
            success = false;
        }
        return success;
    }

    public static String getKey(String strWebSocketKey) throws NoSuchAlgorithmException {
        String acceptKey = strWebSocketKey + MAGIC_WEBSOCKET_KEY;

        MessageDigest shaMD = MessageDigest.getInstance("SHA-1");
        shaMD.reset();
        shaMD.update(acceptKey.getBytes());
        byte messageDigest[] = shaMD.digest();
        String response = new String(Base64.getEncoder().encode(messageDigest));
        return response;
    }
}

