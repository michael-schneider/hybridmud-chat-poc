package com.syncic.hybridmud.utils;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Config {
    private static final Logger LOGGER = Logger.getLogger(Config.class.getName());
    private static final String PROPERTIES_FILENAME = "config.properties";

    private static Config instance;

    private final Map<String, String> configItems;

    private Config() {
        Properties properties = loadProperties();
        configItems = parseProperties(properties);
    }

    private static Map<String, String> parseProperties(Properties properties) {
        final Map<String, String> items = new HashMap<>();

        for (final String name : properties.stringPropertyNames()) {
            items.put(name, properties.getProperty(name));
        }

        return items;
    }

    private Properties loadProperties() {
        final Properties properties = new Properties();
        try (final FileInputStream fis = new FileInputStream(PROPERTIES_FILENAME)) {
            properties.load(fis);
        } catch (FileNotFoundException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, ex.toString(), ex);
        }

        return properties;
    }

    static public Config getInstance() {
        if (instance == null) {
            instance = new Config();
        }
        return instance;
    }

    public String getValueAsString(String name) {
        return configItems.getOrDefault(name, null);
    }

    public int getValueAsInt(String name) {
        final String stringValue=configItems.getOrDefault(name, "0");
        final int intValue=Integer.parseInt(stringValue);
        return intValue;
    }
}
