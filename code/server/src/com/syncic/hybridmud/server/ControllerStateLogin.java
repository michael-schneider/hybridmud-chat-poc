package com.syncic.hybridmud.server;

import com.syncic.hybridmud.world.User;
import com.syncic.hybridmud.world.Users;

import java.text.MessageFormat;
import java.util.Date;

public class ControllerStateLogin implements ControllerState {

    public ControllerStateLogin(ClientController clientController) {
        clientController.getCurrentUser().send("<message>Welcome to HybridMud</message>");
        clientController.getCurrentUser().send("<message>Please enter your name</message>");
    }

    @Override
    public boolean receiveMessage(String message, ClientController clientController) {
        String username = message.trim();
        if (!Users.isValidUsername(username)) {
            clientController.getCurrentUser().send("<error>Username is not valid. Please reenter</error>");
        } else if (Users.getInstance().isUsernameInUse(username)) {
            clientController.getCurrentUser().send("<error>Username is in use, please use a different one.</error>");
        }else {
            clientController.getCurrentUser().setLogindate(new Date());
            clientController.getCurrentUser().setUsername(username);

            Users.getInstance().addUser(clientController.getCurrentUser());

            clientController.getCurrentUser().send(MessageFormat.format("<message>Welcome <user id=\"{0}\">{1}</user></message>", clientController.getCurrentUser().getId(), clientController.getCurrentUser().getUsername()));
            clientController.setControllerState(new ControllerStateChat(clientController));
        }
        return true;
    }


}
