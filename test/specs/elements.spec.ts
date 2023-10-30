import { test, expect, Page } from '@playwright/test';
import { CommonElements } from '../helper/commonElements';
import { MainPage } from '../pages/main.page';
import { ElementsPage } from '../pages/elements.page';

const fullName_1 = 'AlexTest';
const fullName_2 = 'JohnTest';
const email_1 = 'AlexText@mail.com';
const email_2 = 'JohnText@mail.com';
const currentAddress_1 = 'test Street #1\nUSA\nNew York';
const currentAddress_2 = 'test Street #2\nUK\nLondon';
const permanentAddress_1 = 'test Street #3\nSingapore\nSingapore';
const permanentAddress_2 = 'test Street #4\nUkraine\nKyiv';
const chbLabel_1 = ['Home', 'Desktop', 'Notes'];
const chbLabel_2 = ['Home', 'Documents', 'Office', 'Public'];

test.describe('test', () => {
  let page;
  let context;
  let commonElements;
  let mainPage;
  let elementsPage;


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
  });

  test('Go to Elements page and check text box ', async () => {
    await mainPage.openMainPage();
    await mainPage.clickElementsBtn();
  });
  test('Verify text boxes ', async () => {
    await elementsPage.clickTextBoxBtn();
    expect(await elementsPage.getFullNameInputPH()).toBe('Full Name');
    await elementsPage.setTextBoxFields(fullName_1, email_1, currentAddress_1, permanentAddress_1);
    await elementsPage.clickSubmitBtn();
    expect(await elementsPage.getFullNameValue()).toBe(fullName_1);
    expect(await elementsPage.getUserEmailValue()).toBe(email_1);
    expect(await elementsPage.getCurrentAddressValue()).toBe(currentAddress_1);
    expect(await elementsPage.getPermanentAddressValue()).toBe(permanentAddress_1);
    expect(await elementsPage.getCurrentAddressLabelValue()).toContain(currentAddress_1);
    expect(await elementsPage.getPermanentAddressLabelValue()).toContain(permanentAddress_1);
  });
  test('Verify edit text boxes', async () => {
    await elementsPage.setTextBoxFields(fullName_2, email_2, currentAddress_2, permanentAddress_2);
    await elementsPage.clickSubmitBtn();
    expect(await elementsPage.getFullNameValue()).toBe(fullName_2);
    expect(await elementsPage.getUserEmailValue()).toBe(email_2);
    expect(await elementsPage.getCurrentAddressValue()).toBe(currentAddress_2);
    expect(await elementsPage.getPermanentAddressValue()).toBe(permanentAddress_2);
    expect(await elementsPage.getCurrentAddressLabelValue()).toContain(currentAddress_2);
    expect(await elementsPage.getPermanentAddressLabelValue()).toContain(permanentAddress_2);
  });
  test('Verify empty text boxes after page refresh', async () => {
    await mainPage.refreshPage();
    expect(await elementsPage.getFullNameValue()).toBe("");
    expect(await elementsPage.getUserEmailValue()).toBe("");
    expect(await elementsPage.getCurrentAddressValue()).toBe("");
    expect(await elementsPage.getPermanentAddressValue()).toBe("");
  });
  test('Verify Check boxes', async () => {
    await elementsPage.clickCheckBoxBtn();
    await elementsPage.setElementsChbToggleByLabelText(chbLabel_1[0])
    await elementsPage.setElementsChbToggleByLabelText(chbLabel_1[1]);
    await elementsPage.setElementsChbByLabelText(chbLabel_1[2]);
    expect(await elementsPage.isChbResultLabelDisplayed(chbLabel_1[2].toLowerCase()));
    await elementsPage.setElementsChbByLabelText(chbLabel_1[1]);
    expect(await elementsPage.isChbResultLabelDisplayed(chbLabel_1[1].toLowerCase()));
    await elementsPage.setElementsChbByLabelText(chbLabel_1[0]);
    expect(await elementsPage.isChbResultLabelDisplayed(chbLabel_1[0].toLowerCase()));
  });
  test('Verify Radio buttons ', async () => {
    await elementsPage.clickRadioButtonBtn();
    await elementsPage.setYesRbtn();
    expect(await elementsPage.isYesRbtnSelected()).toBe(true);
    expect(await elementsPage.isImpressiveRbtnSelected()).toBe(false);
    expect(await elementsPage.isImpressiveRbtnSelected()).toBe(false);
    expect(await elementsPage.isYesButtonActive()).toBe(true);
    expect(await elementsPage.isImpressiveButtonActive()).toBe(true);
    expect(await elementsPage.isNoButtonActive()).toBe(false);
    await elementsPage.setImpressiveRbtn();
    expect(await elementsPage.isYesRbtnSelected()).toBe(false);
    expect(await elementsPage.isImpressiveRbtnSelected()).toBe(true);
    expect(await elementsPage.isImpressiveRbtnSelected()).toBe(true);
    expect(await elementsPage.isYesButtonActive()).toBe(true);
    expect(await elementsPage.isImpressiveButtonActive()).toBe(true);
    expect(await elementsPage.isNoButtonActive()).toBe(false);
  });

  test.afterAll(async ({},testInfo) => {
    await context.close();
    await page.close();
  });


});

