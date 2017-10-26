package com.syncic.hybridmud;

import com.syncic.hybridmud.server.WebSocketServer;

public class Starter {
    public static void main(String[] args) {
        new WebSocketServer().start();
    }
}

