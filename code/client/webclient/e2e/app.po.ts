import { browser, by, element } from 'protractor';
import { Element } from '@angular/compiler';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  writeUsernameField(username: string): void {
    element(by.css('#username')).sendKeys(username);
  }

  clickSubmit(): void {
    element(by.css('#submit')).click();
  }

  getLocalErrorText() {
    return element(by.css('.error-local')).getText();
  }

  getServerErrorText() {
    return element(by.css('.error-server')).getText();
  }
}
