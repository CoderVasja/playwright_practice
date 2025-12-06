import { test, expect } from '@playwright/test';
// import validation messages
import { validationMessages } from '../../utils/fixtures/validation-message';
// import LoginPage class from pages
import {LoginPage} from '../../pages/login-page'; 
// import test data 
import { testData } from '../../utils/fixtures/test-data';



test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;  
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  
        await loginPage.goto();  
    });

    test('Valid Login Test', async ({ page }) => {
        await loginPage.login(testData.testUser, testData.password);
        expect (page.url()).toBe(process.env.BASE_URL + 'inventory.html');
    });

    test('Login with empty fields', async ({ page }) => {
        await loginPage.login('','');
        await expect(loginPage.errorMessage).toHaveText(validationMessages.emptyUsernamePassword);
    });
});