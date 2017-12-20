package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;
import com.syncic.hybridmud.user.Users;

public class CommandWho extends Command {
    @Override
    public boolean handleCommand(User user, String message) {
        if (getCommandString(message).equals("who")) {
            StringBuilder usersString = new StringBuilder();
            User[] users = Users.getInstance().getValidUsers();
            usersString.append("<users type=\"list\">");
            for (final User chatUser : users) {
                usersString.append(chatUser.toXml());
            }
            usersString.append("</users>");
            user.send(usersString.toString());
            return true;
        }
        return false;
    }
}
