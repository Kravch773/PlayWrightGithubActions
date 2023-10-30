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

  get dobLabel(): string {
    return '#dateOfBirth-label';
  }

  get subjectInput(): string {
    return '//div[@id="subjectsContainer"]//input';
  }

  getStudentFormValueByLabel(labelText): string {
    return `//td[text()="${labelText}"]/..//td[2]`;
  }

  async setFormCheckBoxState(element: string, chbState: boolean): Promise<void> {
    if ((await this.page.locator(element).isChecked()) !== chbState) {
      await this.click(element + '/../label');
    }
  }

  async setPracticeForm(firstName, lastName, userEmail, gender, userMobile, userDob,subject, hobbie, filePath, currentAddress): Promise<void> {
    await this.setValue(this.firstNameInput, firstName);
    await this.setValue(this.lastNameInput, lastName);
    await this.setValue(this.userEmailInput, userEmail);
    await this.click(this.getGenderRbtnByLabelText(gender) + '/../label');
    await this.setValue(this.userNumberInput, userMobile);
    await this.setValue(this.dateOfBirthInput, userDob);
    await this.click(this.dobLabel);
    await this.setValue(this.subjectInput,subject)
    await this.page.keyboard.press('Enter');
    await this.setFormCheckBoxState(this.getFormChbByLabel(hobbie), true);
    await this.uploadFile(this.getUploadFileInput(), filePath);
    await this.setValue(this.currentAddressInput, currentAddress);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.getElementValue(this.firstNameInput);
  }

  async clickSubmitFormBtn(): Promise<void> {
    await this.click(this.submitFormBtn);
  }

  async getStudentNameFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Student Name'));
  }

  async getStudentEmailFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Student Email'));
  }

  async getGenderFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Gender'));
  }

  async getMobileFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Mobile'));
  }

  async getDobFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Date of Birth'));
  }

  async getSubjectsFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Subjects'));
  }

  async getHobbiesFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Hobbies'));
  }

  async getPictureFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Picture'));
  }

  async getAddressFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('Address'));
  }

  async getStateCityFormLabel(): Promise<string> {
    return this.getElementText(this.getStudentFormValueByLabel('State and City'));
  }
}