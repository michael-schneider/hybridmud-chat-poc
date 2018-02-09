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

  writeChatAndSend(message: string) {
    this.browser.element(by.css('#messageInput')).sendKeys(message);
    this.browser.element(by.css('#chatButton')).click();
  }

  async getChatContents(): Promise<string[]> {
    const messageContent = await this.browser.element(by.css('.chat-messages')).getText();
    const messagesArray = messageContent.split('\n');
    return messagesArray;
  }

  clickLogout(): void {
    element(by.css('#logoutButton')).click();
  }

  getCopyrightText() {
    return this.browser.element(by.css('footer')).getText();
  }

}
