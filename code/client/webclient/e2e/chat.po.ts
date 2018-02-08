import { by, element, ProtractorBrowser } from 'protractor';
import { Element } from '@angular/compiler';

export class ChatPage {

  private browser: ProtractorBrowser;

  constructor(browser: ProtractorBrowser) {
    this.browser = browser;
  }

  async checkPage(): Promise<boolean> {
    let valid: boolean;

    try {
      const header = await element(by.css('.chat-messages-display > .card-header')).getText();
      const url = await this.browser.driver.getCurrentUrl();

      valid = (header === 'Chat Messages') && /\/chat/.test(url);
    } catch (err) {
      valid = false;
    }
    return valid;

  }

  clickLogout(): void {
    element(by.css('#logoutButton')).click();
  }

  getCopyrightText() {
    return this.browser.element(by.css('footer')).getText();
  }

}
