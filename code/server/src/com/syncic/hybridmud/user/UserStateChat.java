package com.syncic.hybridmud.user;

import com.syncic.hybridmud.utils.Command;
import org.apache.commons.text.StringEscapeUtils;
import java.text.MessageFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<server subsystem=\"server\">Welcome to the chat</server>");
        user.send("<server subsystem=\"server\">type 'bye' to disconnect</server>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        if (Command.isCommand(message)) {
            Command command=new Command(message);
            final String commandString  = command.getCommand();
            switch (commandString) {
                case "bye":
                    user.send("<server subsystem=\"server\">Bye!</server>");
                    user.send("<server subsystem=\"server\">Bye!</server>");
                break;

                default:

                    user.send(MessageFormat.format("<server subsystem=\"server\">Do not understand \"{0}\"</server>", StringEscapeUtils.escapeXml11(command)));

            }
        } else {
            String decodedMessage = Command.decode(message);
        }

        user.send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }

    private String escapeXml(String message) {

        return "";
    }

}
