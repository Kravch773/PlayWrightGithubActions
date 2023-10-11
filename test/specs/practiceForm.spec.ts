import { test, expect, Page } from '@playwright/test';
import { CommonElements } from '../helper/commonElements';
import { MainPage } from '../pages/main.page';
import { ElementsPage } from '../pages/elements.page';
import { FormPage } from '../pages/form.page';
import { BrowserStackAuth } from '../helper/browserStackAuth';

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
const userDob_1 = '05 Sep 2001';
const userDob_2 = '06 Oct 1991';
const hobbie_1 = 'Reading';
const hobbie_2 = 'Sports';
const filePath_1 = './testFiles/PCE_testDoc_1.docx';
const filePath_2 = './testFiles/PCE_testDoc_2.docx';
const currentAddress_1 = 'test Street #1\nUSA\nNew York';
const currentAddress_2 = 'test Street #2\nUK\nLondon';


test.describe('test', () => {
  let page;
  let context;
  let commonElements;
  let mainPage;
  let elementsPage;
  let practiceForm;
  let browserStackAuth;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async () => {
    commonElements = new CommonElements(page);
    mainPage = new MainPage(page);
    elementsPage = new ElementsPage(page);
    practiceForm = new FormPage(page);
    browserStackAuth = new BrowserStackAuth(page);
  });

  test('Go to Elements page and check text box ', async ({}) => {
    commonElements = new CommonElements(page);
    mainPage = new MainPage(page);
    elementsPage = new ElementsPage(page);
    practiceForm = new FormPage(page);
    await mainPage.openMainPage();
    await mainPage.clickFormsBtn();
  });
  test('Verify Form', async () => {

    await elementsPage.clickPracticeFormBtn();
    await practiceForm.setPracticeForm(firstName_1, lastName_1, userEmail_1, gender_1, userMobile_1, userDob_1, hobbie_1, filePath_1, currentAddress_1);
    expect(await practiceForm.getFirstNameValue()).toBe(firstName_1);
    // await practiceForm.clickSumbitFormBtn(); //site bug
  });

  test.afterAll(async ({},testInfo) => {
    const status = testInfo.status;
    await browserStackAuth.updateBrowserStackStatus(status);
    await context.close();
    await page.close();
  });
});

