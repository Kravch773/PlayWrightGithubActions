import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export class DateForm {

  static getCurrentDate(fullYear = false, monthWithZeros = false): string {
    let today = new Date();
    // let date: string;
    let month = (today.getMonth() + 1).toString();
    if (today.getMonth() < 9) {
      month = '0' + (today.getMonth() + 1).toString();
    }
    // if (today.getDate() < 10) {
    //   date = '0' + (today.getDate() + 1).toString();
    // }
    let todayDate = month + '/' + today.getDate() + '/' + today.getFullYear();
    if (monthWithZeros == false && fullYear == false) {
      todayDate = this.createStandardDateForm(todayDate);
    }
    return todayDate;
  }

  static createStandardDateForm(date): string {
    let newDateArr: string[];
    if (date.includes('.')) {
      newDateArr = date.split('.');
    }
    if (date.includes('/')) {
      newDateArr = date.split('/');
    }
    if (Number(newDateArr[0]) <= 9 && newDateArr[0].length == 2) {
      newDateArr[0] = newDateArr[0].substring(1);
    } //remove 0 from month
    if (Number(newDateArr[1]) <= 9 && newDateArr[1].length == 2) {
      newDateArr[1] = newDateArr[1].substring(1);
    }//remove 0 from days
    if (newDateArr[2].length > 5) { //remove time or aditional data after year
      let yearArr = newDateArr[2].split(',');
      newDateArr[2] = yearArr[0];
    }
    if (newDateArr[2].length == 4) { //remove first 2 digits from year
      newDateArr[2] = newDateArr[2].slice(2);
    }
    return newDateArr[0] + '/' + (newDateArr[1]) + '/' + newDateArr[2];
  }

  static addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getCurrentDatePlusDays(addDays: number, fullYear = false, monthWithZeros = false): string {
    let today = new Date();
    let date: string;
    today = this.addDays(today, addDays);
    if (monthWithZeros == true) {
      if (today.getMonth() + 1 < 10) {
        date = '0' + (today.getMonth() + 1) + today.getDate() + '/' + today.getFullYear();
      }
    } else {
      date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    }
    if (fullYear == false) {
      date = this.createStandardDateForm(date);
    }
    if (fullYear == true) {
      return date;
    }
    return date;
  }
}
