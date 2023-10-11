import { type Page } from '@playwright/test';
import { BasePage } from '../helper/basePage';

export class CommonElements extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  getMenuListBtnByName(elementName:string):string{
    return `//li//span[text()="${elementName}"]`
  }
  getMenuElementByName(listName:string):string{
    return`//div[@class="header-text"][text()="${listName}"]`
  }
  async clickMenuListElementByName(elementName:string):Promise<void>{
    await this.click(this.getMenuListBtnByName(elementName));
  }
  async clickMenuElementByName(elementName:string):Promise<void>{
    await this.click(elementName);
  }

}
