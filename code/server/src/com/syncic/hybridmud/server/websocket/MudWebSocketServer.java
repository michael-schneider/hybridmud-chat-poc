package com.syncic.hybridmud.server.websocket;

import com.syncic.hybridmud.utils.Config;
import com.syncic.hybridmud.world.User;
import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.text.MessageFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MudWebSocketServer extends WebSocketServer {
    private static final Logger LOGGER = Logger.getLogger(MudWebSocketServer.class.getName());
    private final User currentUser;

    public MudWebSocketServer(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
        this.currentUser = new User();
        //currentUser.setTransmitter(new WebSocketTransmitter(socket));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        broadcast("new connection: " + handshake.getResourceDescriptor());
        System.out.println(conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        broadcast(conn + " has left the room!");
        System.out.println(conn + " has left the room!");
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        broadcast(message);
        System.out.println(conn + ": " + message);
    }

    @Override
    public void onMessage(WebSocket conn, ByteBuffer message) {
        broadcast(message.array());
        System.out.println(conn + ": " + message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        if (conn != null) {
            // some errors like port binding failed may not be assignable to a specific websocket
        }
    }

    @Override
    public void onStart() {
        LOGGER.log(Level.INFO, MessageFormat.format("Server started on port {0}", String.valueOf(getPort())));
    }

}