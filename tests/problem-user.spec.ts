import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { allure } from 'allure-playwright';

test.describe('Problem_user bugs', () => {
  test.use({ storageState: 'playwright/.auth/problem-user.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

test('About button', async ({ page }) => {
  await allure.epic('Navigation');
  await allure.feature('Menu');
  await allure.story('About link');
  await allure.severity('minor');

  const inventoryPage = new InventoryPage(page);

  await test.step('Open hamburger menu', async () => {
    await inventoryPage.openHamburgerMenu();
  });

  await test.step('Click About link', async () => {
    await page.locator('[data-test="about-sidebar-link"]').click();
  });

  await test.step('Verify redirection to Sauce Labs about page', async () => {
    await expect(page).toHaveURL('https://saucelabs.com/error/404');
  });
});

test('Items Pictures should match each item', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Product display');
  await allure.story('Product images mismatch');
  await allure.severity('trivial');

  test.fail(); // This test should fail, as the only pictures displayed is the same for all the items.

  await test.step('Get image sources for two different products', async () => {
    const backpackImg = await page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]').getAttribute('src');
    const bikeLightImg = await page.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]').getAttribute('src');

    expect(backpackImg).not.toBe(bikeLightImg);
  });
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
  await allure.epic('Shopping list');
  await allure.feature('Cart');
  await allure.story('Adding known-working products to cart');
  await allure.severity('normal');

  await test.step('Add three products to the cart', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  });

  await test.step('Verify the cart badge shows 3', async () => {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
  });
});

test('All 6 products should be addable to cart', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Cart');
  await allure.story('Adding all products to cart');
  await allure.severity('trivial');

  test.fail(); // This test should fail as only some of the items are added to cart

  await test.step('Add all 6 products to the cart', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  });

  await test.step('Verify the cart badge shows 6', async () => {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('6');
  });
});

test('Remove button should work properly', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Cart');
  await allure.story('Remove button not working');
  await allure.severity('trivial');

  test.fail(); // This test should fail because the Remove button does not work at all.

  await test.step('Add a product to the cart', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  await test.step('Remove the product from the cart', async () => {
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  });

  await test.step('Verify the cart badge disappears', async () => {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });
});

test('Item description should match the right item', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Product display');
  await allure.story('Item description mismatch');
  await allure.severity('trivial');

  test.fail(); // This test should fail because clicking a product's title leads to a mismatched or missing product page

  await test.step('Verify each product detail page matches its listed name', async () => {
    const itemCount = await page.locator('.inventory_item_name').count();

    for (let i = 0; i < itemCount; i++) {
      const expectedName = await page.locator('.inventory_item_name').nth(i).textContent();
      await page.locator('.inventory_item_name').nth(i).click();

      const actualName = await page.locator('[data-test="inventory-item-name"]').textContent();
      expect(actualName).toBe(expectedName);

      await page.goBack();
    }
  });
});

test('Add to cart from item detail page should reliably update the cart', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Cart');
  await allure.story('Cart badge inconsistency from detail page');
  await allure.severity('trivial');

  test.fail(); // This test should fail because the badge count doesn't always match what's actually in the cart

  await test.step('Add every product to cart from its detail page', async () => {
    const itemCount = await page.locator('.inventory_item_name').count();

    for (let i = 0; i < itemCount; i++) {
      await page.locator('.inventory_item_name').nth(i).click();
      await page.locator('[data-test="add-to-cart"]').click();
      await page.goBack();
    }
  });

  await test.step('Verify the cart badge matches the actual number of items in the cart', async () => {
    const badgeText = await page.locator('[data-test="shopping-cart-badge"]').textContent();

    await page.locator('[data-test="shopping-cart-link"]').click();
    const actualItemsInCart = await page.locator('.inventory_item_name').count();

    expect(actualItemsInCart).toBe(Number(badgeText));
  });
});

  test('First Name and Last Name fields should not overwrite each other', async ({ page }) => {
  await allure.epic('Known issues');
  await allure.feature('Checkout');
  await allure.story('First/Last name field conflict');
  await allure.severity('trivial');

  test.fail(); // This test should fail because typing in Last Name overwrites First Name (shared field id)

  await test.step('Add a product and start checkout', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  await test.step('Fill in first and last name', async () => {
    await page.locator('[data-test="firstName"]').fill('Sebastien');
    await page.locator('[data-test="lastName"]').fill('Chup');
  });

  await test.step('Verify both fields kept their own value', async () => {
    expect(await page.locator('[data-test="firstName"]').inputValue()).toBe('Sebastien');
    expect(await page.locator('[data-test="lastName"]').inputValue()).toBe('Chup');
  });
  });
});