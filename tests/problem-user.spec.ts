import { test, expect } from '@playwright/test';

test.describe('Problem_user bugs', () => {
  test.use({ storageState: 'playwright/.auth/problem-user.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('About button', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="about-sidebar-link"]').click();
    await expect(page).toHaveURL('https://saucelabs.com/error/404');
  });

  test('Items Pictures should match each item', async ({ page }) => {
    test.fail(); // This test should fail, as the only pictures displayed is the same for all the items.

    const backpackImg = await page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]').getAttribute('src');
    const bikeLightImg = await page.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]').getAttribute('src');

    expect(backpackImg).not.toBe(bikeLightImg);
  });

  test('Lowest to Highest price should work correctly', async ({ page }) => {
    test.fail(); // This test should fail because the sort function doesn't work.

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('3 known-working products can be added to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
  });

  test('All 6 products should be addable to cart', async ({ page }) => {
    test.fail(); // This test should fail as only some of the items are added to cart

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('6');
  });

  test('Remove button should work properly', async ({ page }) => {
    test.fail(); // This test should fail because the Remove button does not work at all.

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

  test('Item description should match the right item', async ({ page }) => {
    test.fail(); // This test should fail because clicking a product's title leads to a mismatched or missing product page

    const itemCount = await page.locator('.inventory_item_name').count();

    for (let i = 0; i < itemCount; i++) {
      const expectedName = await page.locator('.inventory_item_name').nth(i).textContent();
      await page.locator('.inventory_item_name').nth(i).click();

      const actualName = await page.locator('[data-test="inventory-item-name"]').textContent();
      expect(actualName).toBe(expectedName);

      await page.goBack();
    }
  });

  test('Add to cart from item detail page should reliably update the cart', async ({ page }) => {
    test.fail(); // This test should fail because the badge count doesn't always match what's actually in the cart

    const itemCount = await page.locator('.inventory_item_name').count();

    for (let i = 0; i < itemCount; i++) {
      await page.locator('.inventory_item_name').nth(i).click();
      await page.locator('[data-test="add-to-cart"]').click();
      await page.goBack();
    }

    const badgeText = await page.locator('[data-test="shopping-cart-badge"]').textContent();

    await page.locator('[data-test="shopping-cart-link"]').click();
    const actualItemsInCart = await page.locator('.inventory_item_name').count();

    expect(actualItemsInCart).toBe(Number(badgeText));
  });

  test('First Name and Last Name fields should not overwrite each other', async ({ page }) => {
    test.fail(); // This test should fail because typing in Last Name overwrites First Name (shared field id)

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Sebastien');
    await page.locator('[data-test="lastName"]').fill('Chup');

    expect(await page.locator('[data-test="firstName"]').inputValue()).toBe('Sebastien');
    expect(await page.locator('[data-test="lastName"]').inputValue()).toBe('Chup');
  });
});