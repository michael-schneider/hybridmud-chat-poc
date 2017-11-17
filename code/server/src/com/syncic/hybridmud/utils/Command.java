package com.syncic.hybridmud.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Command {
    public final static String COMMAND_START_INDICATOR = "/";
    private final static String COMMAND_PATTERN = String.format("^%s(\\S+)(\\s+(.*))?", COMMAND_START_INDICATOR);


    private final String command;

    public Command(String command) {
        this.command = command;
    }

    public String getCommand() {
        String match = null;
        final Pattern pattern = Pattern.compile(COMMAND_PATTERN);
        Matcher matcher = pattern.matcher(command);
        if (matcher.find()) {
            match = matcher.group(1);
        }
        return match;
    }

    public String getCommandArgument() {
        String match = null;
        final Pattern pattern = Pattern.compile(COMMAND_PATTERN);
        Matcher matcher = pattern.matcher(command);
        if (matcher.find() && matcher.groupCount() == 3) {
            match = matcher.group(3);
        }
        return match;
    }


    public static boolean isCommand(String message) {
        return message.startsWith(COMMAND_START_INDICATOR);
    }


}
