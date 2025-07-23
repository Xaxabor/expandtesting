import {test, request, expect, type Page} from '@playwright/test';
import { Notes } from '../page-object/Notes';
const { login } = require('../Utils/LoginHelper');
import  dotenv from 'dotenv';

// Read environment variables from file
dotenv.config(); 

const username = process.env.USER_EMAIL;
const password = process.env.PASSWORD;
const baseURL = process.env.BASE_URL;

// This is a sample test case to demonstrate the usage of the Notes page object
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL+'/notes/app/');
  await login(page, username, password);
});

test('Test 1: Add Notes', 
  async ({ page }) => {
  const notePage = new Notes(page);
  
  await notePage.emptyNotesList();
  await notePage.clickOnButton(notePage.addNoteButton);
  await notePage.setTextFieldValue(notePage.titleTextFieldLabel, 'Sample Note Title');
  await notePage.setTextAreaValue(notePage.descriptionTextBoxLabel, 'This is a sample note description.');
  await notePage.selectDropdownValue(notePage.categoryDropdownLabel, 'Home');
  await notePage.clickOnCheckbox(notePage.completedCheckbox);
  await notePage.clickOnButton(notePage.createButton);
  
  // Verify the note is added successfully
  await notePage.verifyNoteExists('Sample Note Title', 'This is a sample note description.');
});

test('Test 2: Edit Notes', 
  async ({ page }) => {
  const notePage = new Notes(page);
  
  await notePage.clickOnModalButton('Sample Note Title', notePage.editButton);
  await notePage.setTextFieldValue(notePage.titleTextFieldLabel, 'Updated Note Title');
  await notePage.setTextAreaValue(notePage.descriptionTextBoxLabel, 'This is an updated note description.');
  await notePage.clickOnButton(notePage.saveButton);
  
  // Verify the note is updated successfully
  await notePage.verifyNoteExists('Updated Note Title', 'This is an updated note description.');
});

test('Test 3: Delete Notes', 
  async ({ page }) => {
  const notePage = new Notes(page);
  
  await notePage.clickOnModalButton('Updated Note Title', notePage.deleteButton);
  await notePage.clickOnModalButton(notePage.deleteNoteModalHeader, 'Delete');
  
  // Verify the note is deleted successfully
  await notePage.emptyNotesList();
});