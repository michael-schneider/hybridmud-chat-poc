import { LoginPage } from './login.po';
import { browser, ProtractorBrowser } from 'protractor';

describe('The login page', () => {
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

  it('should display an error if the username has whitespace', () => {
    const chatPage = loginPage.loginAs('with spaces');
    expect(loginPage.getServerErrorText()).toEqual('Username is not valid. Please reenter.');
    expect(chatPage.checkPage()).toBeFalsy();
  });

  it('should display an error if there is no username', () => {
    const chatPage = loginPage.loginAs('');
    expect(loginPage.getLocalErrorText()).toEqual('A username is required. Please enter one.');
    expect(chatPage.checkPage()).toBeFalsy();
  });

  it('should be able to fork browsers', function () {
    browser.get('/');
    newBrowser = browser.forkNewDriverInstance();
    expect(newBrowser).not.toEqual(browser);
    expect(newBrowser.driver).not.toEqual(browser.driver);
    expect(newBrowser.driver.getCurrentUrl()).toEqual('data:,');
  });

  it('should have a copyright message', function () {
    loginPage.navigateTo();
    expect(loginPage.getCopyrightText()).toEqual('Created by SYS in 2018.');
  });

  it('should display an error if the username is already taken', () => {
    newBrowser = browser.forkNewDriverInstance(true, true); // Same URL as "browser"
    const secondLoginPage = new LoginPage(newBrowser);

    const chatPage = loginPage.loginAs('Testuser000');
    expect(chatPage.checkPage()).toBeTruthy();

    const secondChatPage = secondLoginPage.loginAs('Testuser000');
    expect(secondChatPage.checkPage()).toBeFalsy();

    expect(secondLoginPage.getServerErrorText()).toEqual('Username is in use, please use a different one.');
  });
});
