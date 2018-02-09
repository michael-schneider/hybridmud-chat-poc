import { LoginPage } from './login.po';
import { browser, ProtractorBrowser } from 'protractor';

describe('The chat page', () => {
  let loginPage: LoginPage;
  let newBrowser: ProtractorBrowser;

  beforeEach(() => {
    loginPage = new LoginPage(browser);
  });

  afterEach(function (done) {
    // Calling quit will remove the browser.
    // You can choose to not quit the browser, and protractor will quit all of
    // them for you when it exits (i.e. if you need a static number of browsers
    // throughout all of your tests). However, I'm forking browsers in my tests
    // and don't want to pile up my browser count.
    // @see https://github.com/angular/protractor/blob/master/spec/interaction/interaction_spec.js
    if (newBrowser) {
      newBrowser.quit().then(() => {
        newBrowser = null;
        done();
      });
    } else {
      done();
    }
  });

  it('should have a copyright message', function () {
    loginPage.navigateTo();
    loginPage.writeUsernameField('CopyRightTest');
    const chatPage = loginPage.clickSubmit();
    expect(chatPage.getCopyrightText()).toEqual('Created by SYS in 2018.');
  });

  it('should be possible to chat', function () {
    newBrowser = browser.forkNewDriverInstance(true, true); // Same URL as "browser"
    const secondLoginPage = new LoginPage(newBrowser);

    const chatPage = loginPage.loginAs('ChatUser');
    expect(chatPage.checkPage()).toBeTruthy();

    const secondChatPage = secondLoginPage.loginAs('SecondChatUser');
    expect(secondChatPage.checkPage()).toBeTruthy();

    chatPage.writeChatAndSend('Hi, how are you doing?');
    secondChatPage.getChatContents().then(
      function(messages: string[]) {
        expect(messages.length).toBe(2);
        expect(messages[0]).toBe('SecondChatUser has logged in.');
        expect(messages[1]).toBe('ChatUser: Hi, how are you doing?');
      }
    );

    secondChatPage.writeChatAndSend('I am Well, how are you?');
    chatPage.getChatContents().then(
      function(messages: string[]) {
        expect(messages.length).toBe(4);
        expect(messages[0]).toBe('ChatUser has logged in.');
        expect(messages[1]).toBe('SecondChatUser has logged in.');
        expect(messages[2]).toBe('ChatUser: Hi, how are you doing?');
        expect(messages[3]).toBe('SecondChatUser: I am Well, how are you?');
      }
    );

  });

  // Direct
  // Login and closing times shall have the name only once!

});
