package com.syncic.hybridmud.server;

import com.syncic.hybridmud.objects.User;
import com.syncic.hybridmud.objects.Users;

import java.text.MessageFormat;
import java.util.Date;

public class ClientStateLogin implements ClientState {

    public ClientStateLogin(ClientHandler clientHandler) {
        clientHandler.writeToStream("<message>Please enter your name</message>");
    }

    @Override
    public boolean receiveMessage(String message, ClientHandler clientHandler) {
        if(!Users.isValidUsername(message)) {
            clientHandler.writeToStream("<error>Username is not valid. Please reenter</error>");
        } else {
            final User user = new User(message, new Date(), clientHandler.getSocket().getRemoteSocketAddress().toString());
            user.setClientHandler(clientHandler);
            Users.getInstance().addUser(user);

            clientHandler.setUser(user);
            clientHandler.writeToStream(MessageFormat.format("<message>Welcome <user id=\"{0}\">{1}</user></message>", user.getId(), user.getUsername()));
            clientHandler.setClientState(new ClientStateChat(clientHandler));
        }
        return true;
    }


}
