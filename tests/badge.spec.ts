import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.use({ storageState: 'playwright/.auth/standard-user.json' })

test.describe('Badge panier', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);  
    inventoryPage = new InventoryPage(page); 
    //await loginPage.goto(); ===> Enlevé suite à l'ajout du test.use au-dessus afin d'éviter de retester ça à chaque fois
    //await loginPage.login('standard_user', 'secret_sauce'); ==> Enlevé suite à l'ajout du test.use au-dessus afin d'éviter de retester ça à chaque fois 
    await page.goto('https://www.saucedemo.com/inventory.html'); // ajouté suite au nouveau test.use
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