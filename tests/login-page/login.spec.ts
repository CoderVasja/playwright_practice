import { test, expect } from '@playwright/test';
import {LoginPage} from '../../pages/login-page';  
import { describe } from 'node:test';

describe('Login Page Tests', () => {
    let loginPage: LoginPage;  
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  
        await loginPage.goto();  
    });

    test('Valid Login Test', async ({ page }) => {
        await loginPage.login('', ''); 
    });
});