import { Page, Locator } from '@playwright/test';



export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('#login-button');
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.errorMessage = page.locator('.error-message-container.error');

    }

    async goto() {
    
        await this.page.goto(process.env.BASE_URL!);
    }

    async login(username?: string, password?: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}

