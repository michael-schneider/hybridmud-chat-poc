package com.syncic.hybridmud.objects;

import java.util.*;

public class Users {
    private List<User> users=new ArrayList<>();

    private static Users instance;

    private Users() {}

    static public Users getInstance() {
        if (instance == null) {
            instance = new Users();
        }
        return instance;
    }

    public static boolean isValidUsername(String username) {
        boolean valid = (username != null) && username.matches("[A-Za-z0-9_]+");
        return valid;
    }

    public boolean isUsernameInUser(String username) {
        return getUserByUsername(username)!=null;
    }
    
    public User getUserByUsername(String username) {
        User ret=null;
        for(final User user : users) {
            if(username.equalsIgnoreCase(user.getUsername())) {
                ret=user;
                break;
            }
        }
        return ret;
    }

    public void addUser(User user) {
        users.add(user);
    }

    public void removeUser(User user) {
        users.remove(user);
    }

    public List<User> getUsers() {
        return new ArrayList<User>(users);
    }


}
