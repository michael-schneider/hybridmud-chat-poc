package com.syncic.hybridmud.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Command {
    private final static String COMMAND_START_INDICATOR ="/";
    private final static String COMMAND_PATTERN= String.format("^%s\\s+([^\\s])\\s*([^\\s].+)", COMMAND_START_INDICATOR);


    private final String command;

    public Command(String command) {
        this.command = command;
    }

    public String getCommand() {
        return parseCommand(1);
    }

    public String getCommandArgument() {
        return parseCommand(2);
    }

    private String parseCommand(int group) {
        String match=null;
        final Pattern pattern = Pattern.compile(COMMAND_PATTERN);
        Matcher matcher = pattern.matcher(command);
        if(matcher.find()) {
            match=matcher.group(group);
        }
        return match;
    }

    public static boolean isCommand(String message) {
        return message.startsWith(COMMAND_START_INDICATOR);
    }

    /**
     * Commands start with a slash. if it is a chat-message, the first slash is escaped.
     * Whitespaces at start and end are removed.
     *
     * @param message the message to decode
     * @return decoded message
     */
    public static String decode(String message) {
        String returnMessage = message.trim();
        if (message.startsWith(String.format("\\%s", COMMAND_START_INDICATOR))) {
            returnMessage = message.substring(1);
        }

        return returnMessage;
    }

}
