import { type Page } from '@playwright/test';
import { strict } from 'assert';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get selectInput(): string {
    return '//ngx-mat-select-search//input[@aria-label="dropdown search"]';
  }

  public get selectElement(): string {
    return '//k2-select';
  }

  getSelectOptionFullMatch(label): string {
    return `//mat-option/span[text()=" ${label} "]/..`;
  }

  getSelectValue(label): string {
    return `//mat-option/span[contains(text(),"${label}")]/..`;
  }

  public getMatCalendarElementByLabelText(labelText): string {
    return `//mat-calendar//td/button[contains(@aria-label,"${labelText}")]`;
  }

  public getMatCalendarMonthTab(): string {
    return '//mat-calendar//td//div[contains(text()," MAY ")]';
  }

  public get chooseDateBtn(): string {
    return '//button[@aria-label="Choose date"]';
  }

  public get chooseMonthAndYearBtn(): string {
    return '//button[@aria-label="Choose month and year"]';
  }

  public get previousYearBtn(): string {
    return `//button[@aria-label="Previous year"]`;
  }

  public get previousMonthBtn(): string {
    return `//button[@aria-label="Previous month"]`;
  }

  public get firstYearOnPage(): string {
    return `(//mat-calendar//td)[1]/button`;
  }

  public get lastYearOnPage(): string {
    return `(//mat-calendar//td)[24]/button`;
  }

  public get previousYearsPageBtn(): string {
    return `//mat-calendar//button[@aria-label="Previous 24 years"]`;
  }

  public get nextYearsPageBtn(): string {
    return `//mat-calendar//button[@aria-label="Next 24 years"]`;
  }

  public get dropDownElement(): string {
    return '//select';
  }

  async openURL(path: string = ''): Promise<void> {
    await this.page.goto(`https://demoqa.com/${path}`);
  }

  async click(element: string): Promise<void> {
    await this.page.locator(element).click();
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


  async setDropDownByOptionValue(element: string, option: string): Promise<void> {
    await this.page.locator(element).selectOption({ label: option });
  }

  async setSelectValue(element = this.selectElement, selectOption): Promise<void> {
    await this.click(element);
    // await this.setValue(this.selectInput, selectOption);
    // if (await this.isElementExisting(this.getSelectOptionFullMatch(selectOption), 250)) {
    //   await this.click(this.getSelectOptionFullMatch(selectOption));
    //   return;
    // }
    await this.click(this.getSelectValue(selectOption));
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

  public async clickMatCalendarElementByLabelText(labelText): Promise<void> {
    await this.click(this.getMatCalendarElementByLabelText(labelText));
  }

  public async clickPreviousYearsPageBtn(): Promise<void> {
    await this.click(this.previousYearsPageBtn);
  }

  public async clickNextYearsPageBtn(): Promise<void> {
    await this.click(this.nextYearsPageBtn);
  }

  public async getMathCalendarAriaLabel(element): Promise<number> {
    return Number(await this.getElementAttribute(element, 'aria-label'));
  }

  public async setMatCalendarYear(year: number): Promise<void> {
    if (await this.getMathCalendarAriaLabel(this.firstYearOnPage) <= year && await this.getMathCalendarAriaLabel(this.lastYearOnPage) >= year) {
      await this.clickMatCalendarElementByLabelText(year);
      return;
    }
    if (await this.getMathCalendarAriaLabel(this.firstYearOnPage) > year) {
      await this.clickPreviousYearsPageBtn();
    }
    if (await this.getMathCalendarAriaLabel(this.lastYearOnPage) < year) {
      await this.clickNextYearsPageBtn();
    }
    await this.setMatCalendarYear(year);
  }

  public async setMatCalendarMonth(month: string): Promise<void> {
    await this.waitForDisplayed(this.previousYearBtn);
    await this.clickMatCalendarElementByLabelText(month);
  }

  public async setMatCalendarDay(day: number): Promise<void> {
    await this.waitForDisplayed(this.previousMonthBtn);
    await this.clickMatCalendarElementByLabelText(` ${day},`);
  }

  async setDateValue(calendarInput, value): Promise<void> {
    await this.click(calendarInput);
    if (await this.isElementExisting(this.getMatCalendarMonthTab(), 2000)) {
      await this.click(this.chooseDateBtn);
      await this.click(this.chooseMonthAndYearBtn);
    } else {
      await this.click(this.chooseMonthAndYearBtn);
    }
    await this.waitForDisplayed(this.chooseDateBtn);
    let date = this.convertStringToDate(value);
    await this.setMatCalendarYear(date.getFullYear());
    await this.setMatCalendarMonth(date.toLocaleString('en-US', { month: 'long' }));
    await this.setMatCalendarDay(date.getDate());
  }

  async getElementValue(element) {
    return await this.page.locator(element).inputValue();
  }

  async getDropDownValueText(dropDownElement = this.dropDownElement): Promise<string> {
    return await this.getElementText(`//option[@value="${await this.getElementValue(dropDownElement)}"]`);
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
  async uploadFile(uploadFileInput,filePath): Promise<void> {
    await this.page.locator(uploadFileInput).setInputFiles(filePath);
  }
}
