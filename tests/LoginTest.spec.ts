import {test, request, expect, type Page} from '@playwright/test';
import { Login } from '../page-object/Login';
import  dotenv from 'dotenv';

// Read environment variables from file
dotenv.config(); 
const baseURL = process.env.BASE_URL;

// This is a sample test case to demonstrate the usage of the Notes page object
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL+'notes/app/login');
});

test('Test 1: Verify invalid email and invalid password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('invalidUser', 'invalidPassword');
  await loginPage.verifyInvalidEmailMessage();
})

test('Test 2: Verify null email and null password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('', '');
  await loginPage.verifyEmailRequiredMessage();
  await loginPage.verifyPasswordRequiredMessage();
})

test('Test 3: Verify null email and valid password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('', 'demo111');
  await loginPage.verifyEmailRequiredMessage();
})

test('Test 4: Verify invalid email and null password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('invalidUser', '');
  await loginPage.verifyInvalidEmailMessage();
  await loginPage.verifyPasswordRequiredMessage();
})

test('Test 5: Verify invalid email and valid password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('invalidUser', 'demo111');
  await loginPage.verifyInvalidEmailMessage();
})

test('Test 6: Verify valid email and null password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('demo111@gmail.com', '');
  await loginPage.verifyPasswordRequiredMessage();
})

test('Test 7: Verify valid email and invalid password login', 
  async ({ page }) => {  
  const loginPage = new Login(page);
  loginPage.login('demo111@gmail.com', 'invalidPassword');
  await loginPage.verifyIncorrectEmailOrPasswordMessage();
})