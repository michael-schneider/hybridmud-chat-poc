package com.syncic.hybridmud.server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler extends Thread {
    private final Socket client;
    private PrintWriter writer;

    ClientHandler (Socket client) {
        this.client = client;
    }

    public void writeToStream(String message) {
        writer.println(message);
    }

    public void run () {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(client.getInputStream()));
            writer = new PrintWriter(client.getOutputStream(), true);
            writer.println("[type 'bye' to disconnect]");

            while (true) {
                String line = reader.readLine();
                if (line.trim().equals("bye")) {
                    writer.println("bye!");
                    break;
                }
                writer.println("[echo] " + line);
            }
        }
        catch (Exception e) {
            System.err.println("Exception caught: client disconnected.");
        }
        finally {
            try { client.close(); }
            catch (Exception e ){ ; }
        }
    }
}

