package com.syncic.hybridmud.user;

import java.text.MessageFormat;

public class UserStateChat implements UserState {

    public UserStateChat(User user) {
        user.send("<server subsystem=\"server\">Welcome to the chat</server>");
        user.send("<server subsystem=\"server\">type 'bye' to disconnect</server>");
    }

    @Override
    public boolean receiveMessage(User user, String message) {
        String decodedMessage = decode(message);

        if (isCommand(message)) {
            final String command = getCommand(message);
            switch (command) {
                default:

                    user.send(MessageFormat.format("<server subsystem=\"server\">Do not understand \"{0}\"</server>", StringEscapeUtils.escapeXml(command)ccommand));

            }
        }

        if (message..equals("bye")){
            user.send("<server subsystem=\"server\">Bye!</server>");
            return false;
        }
        user.send(MessageFormat.format("ChatState: [{0}]", message));

        return true;
    }

    private boolean isCommand(String message) {
        return message.startsWith("/");
    }

    /**
     * Commands start with a slash. if it is a chat-message, the first slash is escaped.
     * Whitespaces at start and end are removed.
     *
     * @param message the message to decode
     * @return decoded message
     */
    private String decode(String message) {
        String returnMessage = message.trim();
        if (message.startsWith("\\/")) {
            returnMessage = message.substring(1);
        }

        return returnMessage;
    }

    private String escapeXml(String message) {

        return "";
    }

}
