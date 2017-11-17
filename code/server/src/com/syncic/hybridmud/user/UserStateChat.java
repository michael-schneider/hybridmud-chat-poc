package com.syncic.hybridmud.user;

import com.syncic.hybridmud.utils.Command;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<server subsystem=\"server\">Welcome to the chat</server>");
        user.send("<server subsystem=\"server\">type '/bye' to disconnect</server>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        if (Command.isCommand(message)) {
            Command command = new Command(message);
            final String commandString = command.getCommand();
            switch (commandString) {
                case "bye":
                    user.send("<server subsystem=\"server\">Bye!</server>");
                    return false;
                default:
                    user.send(MessageFormat.format("<server subsystem=\"server\">Do not understand \"{0}\"</server>", StringEscapeUtils.escapeXml11(message)));
        }
        } else {
            String decodedMessage = decode(message);
            final Users users = Users.getInstance();
            users.broadcast(MessageFormat.format("<chat><user id=\"{0}\">{1}</user><message>{2}</message></chat>",
                    user.getId(), StringEscapeUtils.escapeXml11(user.getUsername()), StringEscapeUtils.escapeXml11(decodedMessage)));
        }

        //user.send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }


    /**
     * Commands start with a slash. if it is a chat-message, the first slash is escaped.
     * Whitespaces at start and end are removed.
     *
     * @param message the message to decode
     * @return decoded message
     */
    private static String decode(String message) {
        String returnMessage = message.trim();
        if (message.startsWith(String.format("\\%s", Command.COMMAND_START_INDICATOR))) {
            returnMessage = message.substring(1);
        }

        return returnMessage;
    }
}
