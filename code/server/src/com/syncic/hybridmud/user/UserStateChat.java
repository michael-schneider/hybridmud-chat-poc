package com.syncic.hybridmud.user;

import com.syncic.hybridmud.utils.Command;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<server>Welcome to the chat</server>");
        user.send("<server>type '/help' for help or '/bye' to disconnect</server>");
        Users.getInstance().broadcast(MessageFormat.format("<users type=\"login\">{0}</users>", user.toXml()));

    }

    @Override
    public boolean receiveMessage(User user, String message) {
        if (Command.isCommand(message)) {
            Command command = new Command(message);
            final String commandString = command.getCommand();
            String messageToUser = "";
            switch (commandString) {
                case "bye":
                    user.send("<server>Bye!</server>");
                    Users.getInstance().broadcast(MessageFormat.format("<users type=\"logout\">{0}</users>", user.toXml()));
                    return false;
                case "who":
                    StringBuilder usersString = new StringBuilder();
                    User[] users = Users.getInstance().getValidUsers();
                    usersString.append("<users type=\"list\">");
                    for (final User chatUser : users) {
                        usersString.append(chatUser.toXml());
                    }
                    usersString.append("</users>");
                    messageToUser = usersString.toString();
                    break;
                default:
                    messageToUser = MessageFormat.format("<server type=\"error\">Do not understand \"{0}\"</server>",
                            StringEscapeUtils.escapeXml11(message));
                    break;
            }
            user.send(messageToUser);
        } else {
            String decodedMessage = decode(message);
            final Users users = Users.getInstance();
            users.broadcast(MessageFormat.format("<chat>{0}<message>{1}</message></chat>",
                    user.toXml(), StringEscapeUtils.escapeXml11(decodedMessage)));
        }

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
