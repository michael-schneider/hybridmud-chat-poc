package com.syncic.hybridmud.user;

import com.syncic.hybridmud.commands.Commands;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserStateChat implements UserState {
    private final ResourceBundle localeStrings;

    public UserStateChat(User user) {
        localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
        user.send("<server>" + localeStrings.getString("welcomeToChat") + "</server>");
        user.send("<server>" + localeStrings.getString("chatInstructions") + "</server>");
        Users.getInstance().broadcast(MessageFormat.format("<users type=\"login\">{0}</users>", user.toXml()));

    }

    @Override
    public void receiveMessage(final User user, final String message) {
        new Commands().processCommand(user, message);
    }


}
