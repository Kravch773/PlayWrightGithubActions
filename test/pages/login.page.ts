import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../helper/basePage';
import { CommonElements } from '../helper/commonElements';

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly commonElements;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.commonElements = new CommonElements(page);
  }

  get emailInput(): string {
    return '#email';
  }

  get passwordInput(): string {
    return '#password';
  }

  get loginBtn(): string {
    return 'button[type="submit"]';
  }

  get profileMenu(): string {
    return '//ul[@class="drop-down profile"]';
  }

  get loginOutBtn(): string {
    return '//a[text()="Log out"]';
  }

  async openLoginURL(): Promise<void> {
    await this.openURL('/auth/login');
  }

  async waitForEmailInputDisplayed(): Promise<void> {
    await this.waitForDisplayed(this.emailInput);
  }

  public async loginToAccount(username: string, password: string): Promise<void> {
    await this.setValue(this.emailInput, username);
    await this.setValue(this.passwordInput, password);
    await this.click(this.loginBtn);
  }

  async clickLoginOutBtn(): Promise<void> {
    await this.click(this.loginOutBtn);
  }

  async waitEmailInputForDisplayed(): Promise<void> {
    await this.waitForDisplayed(this.emailInput, 8000);
  }
}
