package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;
import com.syncic.hybridmud.user.Users;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommandTell extends Command {
    @Override
    public boolean handleCommand(User user, String message) {
        if(getCommandString(message).equals("tell")) {
            final ResourceBundle localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
            final Pattern pattern = Pattern.compile("^(\\S+)\\s+(.*)$");
            Matcher matcher = pattern.matcher(getAllArguments(message));
            if (matcher.find() && matcher.groupCount() == 2) {
                final String username = matcher.group(1);
                final String chatMessage = matcher.group(2);
                User directMessageRecipient = Users.getInstance().getUserByUsername(username);
                if (directMessageRecipient != null) {
                    directMessageRecipient.send(MessageFormat.format("<chat type=\"tell\" direction=\"from\">{0}<message>{1}</message></chat>",
                            user.toXml(), StringEscapeUtils.escapeXml11(chatMessage)));
                    user.send(MessageFormat.format("<chat type=\"tell\" direction=\"to\">{0}<message>{1}</message></chat>",
                            directMessageRecipient.toXml(),StringEscapeUtils.escapeXml11(chatMessage)));

                } else {
                    user.send(MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorNoSuchUser")+"</server>",
                            StringEscapeUtils.escapeXml11(username)));
                }
            } else {
                user.send(MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorWrongArgumentsToTell")+"</server>",
                        StringEscapeUtils.escapeXml11(getAllArguments(message))));
            }
            return true;
        }
        return false;
    }
}
