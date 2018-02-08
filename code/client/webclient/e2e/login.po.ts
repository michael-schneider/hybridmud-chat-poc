import { by, element, ProtractorBrowser } from 'protractor';
import { Element } from '@angular/compiler';
import { ChatPage } from './chat.po';

export class LoginPage {

  private browser: ProtractorBrowser;

  constructor(browser: ProtractorBrowser) {
    this.browser = browser;
  }

  navigateTo() {
    return this.browser.get('/');
  }

  writeUsernameField(username: string): void {
    this.browser.element(by.css('#username')).sendKeys(username);
  }

  clickSubmit(): ChatPage {
    this.browser.element(by.css('#submitButton')).click();
    return new ChatPage(this.browser);
  }

  getLocalErrorText() {
    return this.browser.element(by.css('.error-local')).getText();
  }

  getServerErrorText() {
    return this.browser.element(by.css('.error-server')).getText();
  }

  getCopyrightText() {
    return this.browser.element(by.css('footer')).getText();
  }
}
