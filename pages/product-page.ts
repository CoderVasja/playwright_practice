import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../utils/fixtures/test-data';



export class ProductPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly inventoryItem: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly productSortContainer: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly ZA_SORT = 'za';
    readonly LOW_HIGH_SORT = 'lohi';
    readonly HIGH_LOW_SORT = 'hilo';


    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItem = page.locator('.inventory_item');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.removeButton = page.locator('#remove-sauce-labs-backpack');
        this.productSortContainer = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

    }


    async countProductItems() {
        return await this.inventoryItem.count();
    }

    async checkProcutsItems() {
        const itemCount = await this.countProductItems();
        expect(itemCount).toBe(6);
    }

    async clickAddToCartButton() {
        return this.addToCartButton.click();
    }

    async clickRemoveButton() {
        return this.removeButton.click();
    }

    async checkAddToCartTurnedToRemove() {
        await expect(this.removeButton).toBeVisible();
    }

    async checkRemoveButtonTurnedToAdd() {
        await expect(this.addToCartButton).toBeVisible();
    }

    // Get all product names as an array of strings
    async getAllProductNames() {
        return this.productNames.allTextContents();
    }
    // Get all product prices as an array of strings
    async getAllProductPrices() {
        return this.productPrices.allTextContents();
    }
    async clickProductSortContainer() {
        return this.productSortContainer.click();
    }

    async selectSortOption(optionValue: string) {
        return this.productSortContainer.selectOption(optionValue);
    }

    // Verify products are sorted A to Z by default
    async CheckProsuctSortAzByDefault() {
        const productNames = await this.getAllProductNames();
        // Create a sorted copy of the product names
        const sortedNames = [...productNames].map(n => n.toLowerCase()).sort();
        // Compare the original product names with the sorted names
        expect(productNames.map(n => n.toLowerCase())).toEqual(sortedNames);

    }
    // Verify products are sorted Z to A
    async CheckProsuctSortZa() {
        await this.clickProductSortContainer();
        await this.selectSortOption(this.ZA_SORT);
        const productNames = await this.getAllProductNames();
        // Create a sorted copy of the product names in descending order
        const sortedNames = [...productNames].map(n => n.toLowerCase()).sort().reverse();
        // Compare the original product names with the sorted names
        expect(productNames.map(n => n.toLowerCase())).toEqual(sortedNames);
    }
    
    // Verify products are sorted by price Low to High
    async CheckProsuctSortLowToHigh() {
        await this.clickProductSortContainer();
        await this.selectSortOption(this.LOW_HIGH_SORT);
        const productPrices = await this.getAllProductPrices();
        // Convert price strings to numbers for accurate comparison
        const pricesAsNumbers = productPrices.map(price => parseFloat(price.replace('$', '')));
        // Create a sorted copy of the prices in ascending order
        const sortedPrices = [...pricesAsNumbers].sort((a, b) => a - b);
        expect(pricesAsNumbers).toEqual(sortedPrices);
    }
    async CheckProsuctSortHighToLow() {
        await this.clickProductSortContainer();
        await this.selectSortOption(this.HIGH_LOW_SORT);
        const productPrices = await this.getAllProductPrices();
        // Convert price strings to numbers for accurate comparison
        const pricesAsNumbers = productPrices.map(price => parseFloat(price.replace('$', '')));
        // Create a sorted copy of the prices in descending order
        const sortedPrices = [...pricesAsNumbers].sort((a, b) => b - a);
        expect(pricesAsNumbers).toEqual(sortedPrices);
    }

}

