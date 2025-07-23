import { chromium, Page, FullConfig } from '@playwright/test';
const { login } = require('./Utils/LoginHelper');
import  dotenv from 'dotenv';

// Read environment variables from file
dotenv.config(); 

const username = process.env.USER_EMAIL;
const password = process.env.PASSWORD;
const baseURL = process.env.BASE_URL;


async function globalSetup(config: FullConfig) {
    const { baseURL, storageState, headless } = config.projects[0].use;
    // Launch a new browser instance
    const browser = await chromium.launch({headless : headless});
    const context = await browser.newContext({storageState: storageState});
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto(baseURL+"notes/app" as string);
    await page.waitForTimeout(5000);

    // Check if the user is already logged in (e.g., by looking for a login button)
    const currentUrl = page.url();
    //const isLoginButtonVisible = await page.locator('//a[normalize-space(text())="Login"]').isVisible();

    if (currentUrl.includes('login')) {
        console.log('Session has expired. Logging in now...');
        await login(page, username, password);

        // Wait for login to complete (e.g., wait for a specific element to appear)
        const isLoginOutButtonVisible = await page.waitForSelector('//button[text()="Logout"]', { timeout: 5000 });

        if (isLoginOutButtonVisible) {
            // Save the session storage to a file
            await context.storageState({ path: storageState as string });
        }
    }else{
        console.log('Using existing session.');
    }
 
  // Close the browser
  await browser.close();
}
 
export default globalSetup;