import {test, expect, type Page} from '@playwright/test';
const { Common } = require('./Common');


export class Login extends Common {
    readonly page: Page
    readonly emailTextbox = '//input[@id="email"]';
    readonly passwordTextbox = '//input[@id="password"]';
    readonly loginButton =  '//button[text()="Login"]';
    readonly logoutButton =  '//button[text()="Logout"]';
    readonly loginLink = '//a[text()="Login"]';
    readonly invalidEmailError = '//div[normalize-space(text())="Email address is invalid"]';
    readonly emailRequiredError = '//div[normalize-space(text())="Email address is required"]';
    readonly passwordRequiredError = '//div[normalize-space(text())="Password is required"]';
    readonly incorrectEmailOrPasswordError = '//div[normalize-space(text())="Incorrect email address or password"]';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async login(username: string, password: string){
        await this.page.locator(this.emailTextbox).fill(username);
        await this.page.locator(this.passwordTextbox).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyInvalidEmailMessage() {
        const textLocator = this.page.locator(this.invalidEmailError);
        await expect(textLocator).toBeVisible();
    }

    async verifyEmailRequiredMessage() {
        const textLocator = this.page.locator(this.emailRequiredError);
        await expect(textLocator).toBeVisible();
    }

    async verifyPasswordRequiredMessage() {
        const textLocator = this.page.locator(this.passwordRequiredError);
        await expect(textLocator).toBeVisible();
    }

    async verifyIncorrectEmailOrPasswordMessage() {
        const textLocator = this.page.locator(this.incorrectEmailOrPasswordError);
        await expect(textLocator).toBeVisible();
    }
}