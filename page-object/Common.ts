import {test, expect, type Page, Locator} from '@playwright/test';
 
exports.Common =  class Common {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getElement(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    async click(locator: string): Promise<void> {
        await this.page.locator(locator).click();
    }

    async type(locator: string, text: string): Promise<void> {
        await this.page.locator(locator).fill(text);
    }

    async isVisible(locator: string): Promise<boolean> {
        return await this.page.locator(locator).isVisible();
    }

    async waitForElement(locator: string, timeout = 5000): Promise<void> {
        await this.page.locator(locator).waitFor({ state: "visible", timeout });
    }

    async expectToBeVisible(locator: string): Promise<void> {
        await expect(this.page.locator(locator)).toBeVisible();
    }
    async clickOnButton(button: string){
        await this.page.locator("//button[normalize-space(text())='" + button + "']").click();
    }

    async clickOnModalButton(modalHeader: string, buttonText: string) {
        const buttonLocator = this.page.locator("//div[normalize-space(text())='" + modalHeader + "']/../..//button[normalize-space(text())='" + buttonText + "']");
        await buttonLocator.click();
    }

    async clickOnLocator(locator: string) {
        await this.page.locator(locator).click();
    }

    async setTextFieldValue(label: string, value: string) {
        const locator = this.page.locator("//label[normalize-space(text())='" + label + "']/following-sibling::input");
        await locator.fill(value);
    }

    async setTextAreaValue(label: string, value: string) {
        const locator = this.page.locator("//label[normalize-space(text())='" + label + "']/following-sibling::textarea");
        await locator.fill(value);
    }

    async selectDropdownValue(label: string, value: string) {
        const locator = this.page.locator("//label[normalize-space(text())='" + label + "']/following-sibling::select");
        await locator.selectOption(value);
    }

    async clickOnCheckbox(label: string) {
        const locator = this.page.locator("//label[normalize-space(text())='" + label + "']/preceding-sibling::input");
        await locator.click();
    }
}
// Common class ends here
