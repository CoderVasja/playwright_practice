import { test, expect } from '@playwright/test';
// import validation messages
import { validationMessages } from '../../utils/fixtures/validation-message';
// import LoginPage class from pages
import {LoginPage} from '../../pages/login-page';  

// for loading environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './dev.env' });

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;  
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  
        await loginPage.goto();  
    });

    test('Valid Login Test', async ({ page }) => {
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD); 
    });

    test('Login with empty fields', async ({ page }) => {
        await loginPage.login('','');
        await expect(loginPage.errorMessage).toHaveText(validationMessages.emptyUsernamePassword);
    });
});