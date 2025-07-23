import { authenticator } from 'otplib'; // OTP library
//import * as OTPAuth from 'otpauth'; // OTP library  


const login= async(page , username, password) => {
    const emailTextbox =  page.locator('//input[@id="email"]');
    const passwordTextbox =  page.locator('//input[@id="password"]');
    const loginButton =  page.locator('//button[text()="Login"]');
    const loginLink = page.locator('//a[text()="Login"]');

    await loginLink.click();
    await emailTextbox.fill(username);
    await passwordTextbox .fill(password);
    await loginButton.click();

}

module.exports = {login};