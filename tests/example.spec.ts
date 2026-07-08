import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { 
    await page.goto('https://www.saucedemo.com'); 
    await page.locator('[data-test="password"]').fill('secret_sauce');
});

test.describe('Login', () => {
  test('login success', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
  test('login failed', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
});
test.describe('Badge', () => {
  test('should display cart badge with count 1 after adding one product', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});
  test('should delete cart badge with no more badge displayed on the cart', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});
  test('should display cart badge with count 3 after adding 3 products', async ({ page }) => {  
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');  
});
});
test.describe('Checkout', () => {
  test('Order Completed', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Sebastien');
    await page.locator('[data-test="lastName"]').fill('chup');
    await page.locator('[data-test="postalCode"]').fill('60300');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total:');
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
});
test.describe('Continue Shopping', () => {
    test('Go back to Shopping items list', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
});
test.describe('Sorting List', () => {
  test('Lowest to Highest price', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
      const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
      const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
        for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
}});
  test('Highest to Lowest price', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
      const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
      const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
        for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
}});        
   test('Alphabetical order listing ', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
        const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
        for (let i = 0; i < names.length - 1; i++) {
        expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
}});
});
