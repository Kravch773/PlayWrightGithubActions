import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import axios from 'axios';

export class BrowserStackAuth extends BasePage {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async updateBrowserStackStatus(status: string, reason: string="") {
    const authData = {
      username: process.env.BROWSERSTACK_USERNAME,
      password: process.env.BROWSERSTACK_ACCESS_KEY
    };
    const commandString = `browserstack_executor: ${JSON.stringify({ action: 'getSessionDetails' })}`;
    const result = await this.page.evaluate(command => {
      return eval(command);
    }, commandString);
    const resp = await JSON.parse(result);
    const apiUrl = `https://api.browserstack.com/automate/sessions/${resp.hashed_id}.json`;

    try {
      await axios.put(
            apiUrl,
            {
              status: status,
              reason: reason
        },
        {
          auth: authData,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Статус теста на BrowserStack обновлен');
    } catch (error) {
      console.error('Не удалось обновить статус теста на BrowserStack:', error);
    }
  }

}
