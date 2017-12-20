package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;
import com.syncic.hybridmud.user.Users;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;

public class CommandChat extends Command {
    @Override
    public boolean handleCommand(User user, String message) {
        if(message!=null && !message.startsWith(Commands.COMMAND_START_INDICATOR)) {
            String decodedMessage = decode(message);
            final Users users = Users.getInstance();
            users.broadcast(MessageFormat.format("<chat>{0}<message>{1}</message></chat>",
                    user.toXml(), StringEscapeUtils.escapeXml11(decodedMessage)));
            return true;
        }
        return false;
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
        if (message.startsWith(String.format("\\%s", Commands.COMMAND_START_INDICATOR))) {
            returnMessage = message.substring(1);
        }

        return returnMessage;
    }
}
