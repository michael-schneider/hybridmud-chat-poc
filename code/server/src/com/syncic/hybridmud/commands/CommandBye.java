package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;
import com.syncic.hybridmud.user.Users;

import java.text.MessageFormat;
import java.util.ResourceBundle;

public class CommandBye extends Command {
    @Override
    public boolean handleCommand(User user, String message) {
        if(getCommandString(message).equals("bye")) {
            final ResourceBundle localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
            user.send("<server>"+localeStrings.getString("bye")+"</server>");
            user.logout();
            Users.getInstance().broadcast(MessageFormat.format("<users type=\"logout\">{0}</users>", user.toXml()));
            return true;
        }
        return false;
    }
}
