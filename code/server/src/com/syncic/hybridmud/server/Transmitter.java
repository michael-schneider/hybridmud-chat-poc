package com.syncic.hybridmud.server;

public interface Transmitter {
    void send(String message);
    String getNetId();
    void close();
}
