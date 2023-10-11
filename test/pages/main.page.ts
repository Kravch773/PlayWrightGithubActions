import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../helper/basePage';
import { CommonElements } from '../helper/commonElements';

export class MainPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  get elementsBtn(): string {
    return '//h5[normalize-space()="Elements"]';
  }
  get formsBtn(): string {
    return '//h5[normalize-space()="Forms"]';
  }
  async openMainPage(): Promise<void> {
    await this.openURL();
  }

  async clickElementsBtn(): Promise<void> {
    await this.click(this.elementsBtn);
  }
  async clickFormsBtn(): Promise<void> {
    await this.click(this.formsBtn);
  }
  async refreshPage():Promise<void>{
    await this.page.reload();
  }

}
