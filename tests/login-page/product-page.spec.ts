import { test, expect } from '@playwright/test';

// import ProductPage class from pages
import { ProductPage } from '../../pages/product-page';

// import LoginPage class from pages
import { LoginPage } from '../../pages/login-page';
// import test data 
import { testData } from '../../utils/fixtures/test-data';



test.describe('Product Page Tests', () => {
    let productPage: ProductPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testData.testUser, testData.password);
    });

    test('Verify product items', async ({ page }) => {
        await productPage.checkProcutsItems();
    });

    test('Verify add to cart turned to remove', async ({ page }) => {
        await productPage.clickAddToCartButton();
        await productPage.checkAddToCartTurnedToRemove();
    });

    test('Verify remove button turned to add', async ({ page }) => {
        await productPage.clickAddToCartButton();
        await productPage.clickRemoveButton();
        await productPage.checkRemoveButtonTurnedToAdd();
    });

    test('Verify product sort A to Z', async ({ page }) => {
        await productPage.CheckProsuctSortAzByDefault();
    });

    test('Verify product sort Z to A', async ({ page }) => {
        await productPage.CheckProsuctSortZa();
    });

    test('Verify product sort Low to High', async ({ page }) => {
        await productPage.CheckProsuctSortLowToHigh();
    });

    test('Verify product sort High to Low', async ({ page }) => {
        await productPage.CheckProsuctSortHighToLow();
    }); 
});