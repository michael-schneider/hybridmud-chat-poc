package com.syncic.hybridmud.user;

import com.syncic.hybridmud.utils.Command;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserStateChat implements UserState {
    private final ResourceBundle localeStrings;

    public UserStateChat(User user) {
        localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
        user.send("<server>"+localeStrings.getString("welcomeToChat")+"</server>");
        user.send("<server>"+localeStrings.getString("chatInstructions")+"</server>");
        Users.getInstance().broadcast(MessageFormat.format("<users type=\"login\">{0}</users>", user.toXml()));

    }

    @Override
    public boolean receiveMessage(final User user, final String message) {
        if (Command.isCommand(message)) {
            Command command = new Command(message);
            final String commandString = command.getCommand();
            String messageToUser = "";
            switch (commandString) {
                case "bye":
                    user.send("<server>"+localeStrings.getString("bye")+"</server>");
                    Users.getInstance().broadcast(MessageFormat.format("<users type=\"logout\">{0}</users>", user.toXml()));
                    return false;
                case "tell":
                    final Pattern pattern = Pattern.compile("^(\\S+)\\s+(.*)$");
                    Matcher matcher = pattern.matcher(command.getCommandArgument());
                    if (matcher.find() && matcher.groupCount() == 2) {
                        final String username = matcher.group(1);
                        final String chatMessage = matcher.group(2);
                        User directMessageRecipient = Users.getInstance().getUserByUsername(username);
                        if (directMessageRecipient != null) {
                            directMessageRecipient.send(MessageFormat.format("<chat type=\"tell\" direction=\"from\">{0}<message>{1}</message></chat>",
                                    user.toXml(),StringEscapeUtils.escapeXml11(chatMessage)));
                            messageToUser=MessageFormat.format("<chat type=\"tell\" direction=\"to\">{0}<message>{1}</message></chat>",
                                    directMessageRecipient.toXml(),StringEscapeUtils.escapeXml11(chatMessage));

                        } else {
                            messageToUser = MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorNoSuchUser")+"</server>",
                                    StringEscapeUtils.escapeXml11(command.getCommandArgument()));
                        }
                    } else {
                        messageToUser = MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorWrongArgumentsToTell")+"</server>",
                                StringEscapeUtils.escapeXml11(command.getCommandArgument()));
                    }
                    break;
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
                    messageToUser = MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorInvalidCommand")+"</server>",
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
