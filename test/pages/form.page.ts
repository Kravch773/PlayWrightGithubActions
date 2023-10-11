import { type Page } from '@playwright/test';
import { BasePage } from '../helper/basePage';
import { CommonElements } from '../helper/commonElements';


export class FormPage extends BasePage {
  readonly page: Page;
  readonly commonElements;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.commonElements = new CommonElements(page);
  }

  get firstNameInput(): string {
    return '#firstName';
  }

  get lastNameInput(): string {
    return '#lastName';
  }

  get userEmailInput(): string {
    return '#userEmail';
  }

  getGenderRbtnByLabelText(labelText: string): string {
    return `//input[@name="gender"][@value="${labelText}"]`;
  }

  get userNumberInput(): string {
    return '#userNumber';
  }

  get dateOfBirthInput(): string {
    return '#dateOfBirthInput';
  }

  getFormChbByLabel(labelText): string {
    return `//label[text()="${labelText}"]/..//input`;
  }

  getUploadFileInput(): string {
    return '#uploadPicture';
  }

  get currentAddressInput(): string {
    return '#currentAddress';
  }

  get submitFormBtn(): string {
    return '#submit';
  }
async setFormCheckBoxState(element: string, chbState: boolean):Promise<void> {
    if ((await this.page.locator(element).isChecked()) !== chbState) {
      await this.click(element+"/../label");
    }
}
  async setPracticeForm(firstName, lastName, userEmail, gender, userMobile, userDob, hobbie, filePath, currentAddress): Promise<void> {
    await this.setValue(this.firstNameInput, firstName);
    await this.setValue(this.lastNameInput, lastName);
    await this.setValue(this.userEmailInput, userEmail);
    await this.click(this.getGenderRbtnByLabelText(gender) + '/../label');
    await this.setValue(this.userNumberInput, userMobile);
    // this.setValue(this.dateOfBirthInput, userDob);
    await this.setFormCheckBoxState(this.getFormChbByLabel(hobbie), true);
    await this.uploadFile(this.getUploadFileInput(), filePath);
    await this.setValue(this.currentAddressInput, currentAddress);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.getElementValue(this.firstNameInput);
  }

  async clickSumbitFormBtn(): Promise<void> {
    await this.click(this.submitFormBtn);
  }
}