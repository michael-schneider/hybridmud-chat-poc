package com.syncic.hybridmud.server.websocket;

import com.syncic.hybridmud.user.User;
import com.syncic.hybridmud.user.Users;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.text.MessageFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MudWebSocketServer extends WebSocketServer {
    private static final Logger LOGGER = Logger.getLogger(MudWebSocketServer.class.getName());

    public MudWebSocketServer(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        User user = new User(new WebSocketTransmitter(conn));
        Users.getInstance().addUser(conn, user);

        LOGGER.log(Level.INFO, MessageFormat.format("Connection established for {0}", user.getNetId()));

        //broadcast("new connection: " + handshake.getResourceDescriptor());
        System.out.println(conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        Users users = Users.getInstance();
        LOGGER.log(Level.INFO, MessageFormat.format("Connection closed for {0}", users.getUserByWebSocket(conn).getNetId()));
        Users.getInstance().removeUserByWebSocket(conn);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        LOGGER.log(Level.INFO, MessageFormat.format("Message from {0}: {1}", conn, message));
        Users.getInstance().getUserByWebSocket(conn).receive(message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
        if (conn != null) {
            Users.getInstance().removeUserByWebSocket(conn);
        }
    }

    @Override
    public void onStart() {
        LOGGER.log(Level.INFO, MessageFormat.format("Server started on port {0}", String.valueOf(getPort())));
    }
}