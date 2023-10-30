import { test, expect, Page } from '@playwright/test';
import { CommonElements } from '../helper/commonElements';
import { MainPage } from '../pages/main.page';
import { ElementsPage } from '../pages/elements.page';
import { FormPage } from '../pages/form.page';

const firstName_1 = 'Alex';
const firstName_2 = 'John';
const lastName_1 = 'Smith';
const lastName_2 = 'Doe';
const userEmail_1 = 'alex.smith@email.com';
const userEmail_2 = 'john.doe@email.com';
const gender_1 = 'Male';
const gender_2 = 'Female';
const userMobile_1 = '1234567890';
const userMobile_2 = '0987654321';
const userDob_1 = '05 September,2001';
const userDob_2 = '06 October,2003';
const subject_1 = "Computer Science"
const subject_2 = "Maths"
const hobbie_1 = 'Reading';
const hobbie_2 = 'Sports';
const filePath_1 = './testFiles/PCE_testDoc_1.docx';
const filePath_2 = './testFiles/PCE_testDoc_2.docx';
const fileName_1 = "PCE_testDoc_1.docx"
const fileName_2 = "PCE_testDoc_2.docx"
const currentAddress_1 = 'test Street #1\nUSA\nNew York';
const currentAddress_2 = 'test Street #2\nUK\nLondon';


test.describe('test', () => {
  let page;
  let context;
  let commonElements;
  let mainPage;
  let elementsPage;
  let practiceForm;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
  });

  test.beforeEach(async () => {
    commonElements = new CommonElements(page);
    mainPage = new MainPage(page);
    elementsPage = new ElementsPage(page);
    practiceForm = new FormPage(page);
  });

  test('Go to Form page ', async ({}) => {
    commonElements = new CommonElements(page);
    mainPage = new MainPage(page);
    elementsPage = new ElementsPage(page);
    practiceForm = new FormPage(page);
    await mainPage.openMainPage();
    await mainPage.clickFormsBtn();
  });
  test('Verify Student Registration Form', async () => {
    await elementsPage.clickPracticeFormBtn();
    await practiceForm.setPracticeForm(firstName_1, lastName_1, userEmail_1, gender_1, userMobile_1, userDob_1,subject_1, hobbie_1, filePath_1, currentAddress_1);
    await practiceForm.clickSubmitFormBtn();
    expect(await practiceForm.getStudentNameFormLabel()).toBe(firstName_1+" "+lastName_1);
    expect(await practiceForm.getStudentEmailFormLabel()).toBe(userEmail_1);
    expect(await practiceForm.getGenderFormLabel()).toBe(gender_1);
    expect(await practiceForm.getMobileFormLabel()).toBe(userMobile_1);
    expect(await practiceForm.getDobFormLabel()).toBe(userDob_1);
    expect(await practiceForm.getSubjectsFormLabel()).toBe(subject_1);
    expect(await practiceForm.getHobbiesFormLabel()).toBe(hobbie_1);
    expect(await practiceForm.getPictureFormLabel()).toBe(fileName_1);
    expect(await practiceForm.getAddressFormLabel()).toBe(currentAddress_1);
  });
  // test('Verify Edit Student Registration Form', async () => {
  //   await page.reload();
  //   await practiceForm.setPracticeForm(firstName_2, lastName_2, userEmail_2, gender_2, userMobile_2, userDob_2,subject_2, hobbie_2, filePath_2, currentAddress_2);
  //   await practiceForm.clickSubmitFormBtn();
  //   expect(await practiceForm.getStudentNameFormLabel()).toBe(firstName_2+" "+lastName_2);
  //   expect(await practiceForm.getStudentEmailFormLabel()).toBe(userEmail_2);
  //   expect(await practiceForm.getGenderFormLabel()).toBe(gender_2);
  //   expect(await practiceForm.getMobileFormLabel()).toBe(userMobile_2);
  //   expect(await practiceForm.getDobFormLabel()).toBe(userDob_2);
  //   expect(await practiceForm.getSubjectsFormLabel()).toBe(subject_2);
  //   expect(await practiceForm.getHobbiesFormLabel()).toBe(hobbie_2);
  //   expect(await practiceForm.getPictureFormLabel()).toBe(fileName_2);
  //   expect(await practiceForm.getAddressFormLabel()).toBe(currentAddress_2);
  // });
  test.afterAll(async ({},testInfo) => {
    await context.close();
    await page.close();
  });
});

