import { type Page } from '@playwright/test';
import { strict } from 'assert';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openURL(path: string = ''): Promise<void> {
    await this.page.goto(`https://demoqa.com/${path}`);
  }

  async click(element: string): Promise<void> {
    await this.page.locator(element).click();
  }

  async scrollIntoView(element: string): Promise<void> {
    await this.page.locator(element).scrollIntoViewIfNeeded();
  }

  async setValue(element: string, value: any): Promise<void> {
    await this.page.locator(element).fill(value);
  }

  async waitForDisplayed(element: string, timeout: number = 3000): Promise<void> {
    try {
      await this.page.waitForSelector(element, { state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Element with selector ${element} is not visible`);
    }
  }

  async waitForExisting(element: string, timeout: number = 3000): Promise<void> {
    try {
      await this.page.waitForSelector(element, { timeout });
    } catch (error) {
      throw new Error(`Element with selector ${element} is not existing`);
    }
  }

  async waitForNotDisplayed(element: string, timeout: number = 3000): Promise<void> {
    try {
      await this.page.waitForSelector(element, { state: 'hidden', timeout });
    } catch (error) {
      try {
        await this.page.waitForSelector(element, { state: 'detached', timeout });
      } catch (error) {
        throw new Error(`Element with selector ${element} is still visible`);
      }
    }
  }

  async setCheckBoxState(element: string, chbState: boolean) {
    if ((await this.page.locator(element).isChecked()) !== chbState) {
      await this.click(element);
    }
  }

  async setToggleState(element: string, chbState: boolean) {
    if ((await this.getElementAttribute(element + '/../..', 'class')).includes('-collapse')) {
      await this.click(element);
    }
  }

  async setDemoQACheckBoxElementState(element: string, chbState: boolean) {
    if ((await this.getElementAttribute(element, 'class')).includes('-uncheck')) {
      await this.click(element);
    }
  }

  async isElementDisplayed(element: string, timeout = 3000): Promise<boolean> {
    await this.waitForDisplayed(element);
    try {
      return await this.page.locator(element).isVisible();
    } catch (error) {
      return false;
    }
  }

  async isElementExisting(element: string, timeout = 3000): Promise<boolean> {
    try {
      await this.page.waitForSelector(element, { state: 'attached', timeout });
      const elementCount = await this.page.locator(element).count();
      return elementCount > 0;
    } catch (error) {
      return false;
    }
  }

  async getElementAttribute(element: string, attribute: string) {
    return this.page.locator(element).getAttribute(attribute);
  }

  async getElementText(element: string): Promise<string> {
    return this.page.locator(element).textContent();
    return this.page.locator(element).innerText();
  }

  public convertStringToDate(date): Date {
    let newDateArr: string[];
    if (date.includes('/')) {
      newDateArr = date.split('/');
    }
    if (newDateArr[2].length > 5) { //remove time or aditional data after year
      let yearArr = newDateArr[2].split(',');
      newDateArr[2] = yearArr[0];
    }
    if (newDateArr[2].length == 2) {
      if (Number(newDateArr[2]) >= 50) {
        newDateArr[2] = '19' + newDateArr[2];
      }
      if (Number(newDateArr[2]) < 50) {
        newDateArr[2] = '20' + newDateArr[2];
      }
    }
    let tempDate = (newDateArr[2] + '/' + (newDateArr[0]) + '/' + newDateArr[1]);
    return new Date(tempDate);
  }

  async getElementValue(element) {
    return await this.page.locator(element).inputValue();
  }


  async isRadioBtnSelected(element: string): Promise<boolean> {
    return await this.page.locator(element).isChecked();
  }

  async isElementActive(element: string): Promise<boolean> {
    if (await this.getElementAttribute(element, 'disabled') == '') {
      return false;
    }
    return true;
  }

  async uploadFile(uploadFileInput, filePath): Promise<void> {
    await this.page.locator(uploadFileInput).setInputFiles(filePath);
  }
}
