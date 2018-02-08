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
    loginPage.navigateTo();
    loginPage.writeUsernameField('with spaces');
    const chatPage = loginPage.clickSubmit();
    expect(loginPage.getServerErrorText()).toEqual('Username is not valid. Please reenter.');
    expect(chatPage.checkPage()).toBeFalsy();
  });

  it('should display an error if there is no username', () => {
    loginPage.navigateTo();
    loginPage.writeUsernameField('');
    const chatPage = loginPage.clickSubmit();
    expect(loginPage.getLocalErrorText()).toEqual('A username is required. Please enter one.');
    expect(chatPage.checkPage()).toBeFalsy();
  });

  it('should be able to fork browsers', function () {
    browser.get('index.html');
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
    loginPage.navigateTo();
    newBrowser = browser.forkNewDriverInstance(true, true); // Same URL as "Browser"

    loginPage.writeUsernameField('Testuser000');
    const chatPage = loginPage.clickSubmit();
    expect(chatPage.checkPage()).toBeTruthy();

    const secondLoginPage = new LoginPage(newBrowser);
    secondLoginPage.writeUsernameField('Testuser000');

    secondLoginPage.clickSubmit();

    expect(secondLoginPage.getServerErrorText()).toEqual('Username is in use, please use a different one.');
  });


  // Login and closing times shall have the name only once!

});
