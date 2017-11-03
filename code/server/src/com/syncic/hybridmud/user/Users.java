package com.syncic.hybridmud.user;

import org.java_websocket.WebSocket;

import java.util.*;

public class Users {
    private Map<WebSocket, User> users = new HashMap<>();

    private static Users instance;

    private Users() {
    }

    static public Users getInstance() {
        if (instance == null) {
            instance = new Users();
        }
        return instance;
    }

    public static boolean isValidUsername(String username) {
        boolean valid = (username != null) && username.matches("[A-Za-z0-9_]+");
        return valid;
    }

    public boolean isUsernameInUse(String username) {
        return getUserByUsername(username) != null;
    }

    public User getUserByUsername(String username) {
        User ret = null;
        for (final User user : users.values()) {
            if (username.equalsIgnoreCase(user.getUsername())) {
                ret = user;
                break;
            }
        }
        return ret;
    }

    public User getUserByWebSocket(WebSocket webSocket) {
        return users.getOrDefault(webSocket, null);
    }


    public void addUser(WebSocket webSocket, User user) {
        users.putIfAbsent(webSocket, user);
    }

    public void removeUserByWebSocket(WebSocket webSocket) {
        users.remove(webSocket);
    }

}