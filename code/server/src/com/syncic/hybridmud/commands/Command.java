package com.syncic.hybridmud.commands;

import com.syncic.hybridmud.user.User;

import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class Command {
    protected final static String COMMAND_PATTERN = String.format("^%s(\\S+)(\\s+(.+))?$", Commands.COMMAND_START_INDICATOR);

    public abstract boolean handleCommand(User user, String message);

    protected static String getCommandString(final String command) {
        String match = "";
        final Pattern pattern = Pattern.compile(COMMAND_PATTERN);
        Matcher matcher = pattern.matcher(command);
        if (matcher.find()) {
            match = matcher.group(1);
        }
        return match;
    }

    protected static String getAllArguments(final String command) {
        String match = null;
        final Pattern pattern = Pattern.compile(COMMAND_PATTERN);
        Matcher matcher = pattern.matcher(command);
        if (matcher.find()) {
            match = matcher.group(2);
        }
        return match.trim();
    }

    /*protected static String getCommandArgument(final String command, final int number) {
        final String allArguments = getAllArguments(command);
        String argument = null;

        if (allArguments != null) {
            final String[] arguments = allArguments.split("\\s+");
            if (arguments.length >= number) {
                argument = arguments[number - 1];
            }
        }

        return argument;
    }*/

}
