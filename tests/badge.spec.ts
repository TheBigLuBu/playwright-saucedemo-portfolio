import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Badge panier', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Badge displays 1 after adding 1 item', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    expect(await inventoryPage.getBadgeCount()).toBe('1');
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    expect(await inventoryPage.isBadgeVisible()).toBe(false);
  });

  test('Badge displays 2 after adding 2 items', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    expect(await inventoryPage.getBadgeCount()).toBe('2');
  });
});