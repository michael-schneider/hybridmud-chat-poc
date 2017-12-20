package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;
import org.apache.commons.text.StringEscapeUtils;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class Commands {
    public final static String COMMAND_START_INDICATOR = "/";

    private final List<Command> allCommands;

    public Commands() {
        allCommands = new ArrayList<>();
        allCommands.add(new CommandBye());
        allCommands.add(new CommandWho());
        allCommands.add(new CommandTell());
        allCommands.add(new CommandChat());
    }

    public void processCommand(final User user, final String message) {
        final ResourceBundle localeStrings = ResourceBundle.getBundle("ChatPoc", user.getLocale());
        boolean handled=false;

        for(Command command : allCommands) {
            handled = command.handleCommand(user, message);
            if(handled) {
                break;
            }
        }

        if(!handled) {
            user.send(MessageFormat.format("<server type=\"error\">"+localeStrings.getString("errorInvalidCommand")+"</server>",
                    StringEscapeUtils.escapeXml11(message)));
        }
    }
}
