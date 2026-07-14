import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { 
    await page.goto('https://www.saucedemo.com'); 
    await page.locator('[data-test="password"]').fill('secret_sauce');
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
test.describe('Checkout', () => {
test('First Name missing', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});
test('Last Name missing', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('chup');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
});
test('Postal Code missing', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('chup');
    await page.locator('[data-test="lastName"]').fill('chup');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});        
  test('Canceling checkout', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Sebastien');
    await page.locator('[data-test="lastName"]').fill('chup');
    await page.locator('[data-test="postalCode"]').fill('60300');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');  
    });
    test('Checking total price', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Sebastien');
    await page.locator('[data-test="lastName"]').fill('chup');
    await page.locator('[data-test="postalCode"]').fill('60300');
    await page.locator('[data-test="continue"]').click();
      const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
      const subtotal = parseFloat(subtotalText.split('$')[1]);
      const taxText = await page.locator('[data-test="tax-label"]').textContent();
      const tax = parseFloat(taxText.split('$')[1]);
      const totalText = await page.locator('[data-test="total-label"]').textContent();
      const total = parseFloat(totalText.split('$')[1]);
      expect(subtotal + tax).toBeCloseTo(total, 2);
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
   test('Inverted Alphabetical order listing ', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
        const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
        for (let i = 0; i < names.length - 1; i++) {
        expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
}});
});
test.describe('Hamburger button', () => {
  test('Logout', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com');
});
  test('About button', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="about-sidebar-link"]').click();
    await expect(page).toHaveURL('https://saucelabs.com/');
});
  test('All items button', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="inventory-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});    
test('Is Reset App state working properly', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="reset-sidebar-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});
});
test.describe('Item Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="item-4-title-link"]').click();
});
  test('should show item detail page', async ({ page }) => {
    await expect(page).toHaveURL(/inventory-item.html/);
});
  test('should return to product list', async ({ page }) => {
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
});
test.describe.skip('Problem_user bugs', () => {
  test('About button', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="about-sidebar-link"]').click();
    await expect(page).toHaveURL('https://saucelabs.com/error/404');
});
test('Items Pictures should match each item', async ({ page }) => {
  test.fail(); // This test should fail, as the only pictures displayed is the same for all the items.
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();
  
  const backpackImg = await page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]').getAttribute('src');
  const bikeLightImg = await page.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]').getAttribute('src');
  
  expect(backpackImg).not.toBe(bikeLightImg);
});
test('Lowest to Highest price should work correctly', async ({ page }) => {
  test.fail(); // This test should fail because the sort function doesn't work.

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});
test('3 known-working products can be added to cart', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
});
test('All 6 products should be addable to cart', async ({ page }) => {
  test.fail(); // This test should fail as only some of the items are added to cart
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();

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

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });
test('Item description should match the right item', async ({ page }) => {
  test.fail(); // This test should fail because clicking a product's title leads to a mismatched or missing product page

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();

  const itemCount = await page.locator('.inventory_item_name').count();
  // .count() : compte combien d'éléments correspondent au sélecteur (ici, 
  // combien de titres de produits il y a — normalement 6). Ça évite d'écrire "6" en dur.

  for (let i = 0; i < itemCount; i++) {
    const expectedName = await page.locator('.inventory_item_name').nth(i).textContent();
    await page.locator('.inventory_item_name').nth(i).click();
    // .nth(i) : quand un sélecteur cible plusieurs éléments (comme .inventory_item_name, 
    // qui matche les 6 titres), .nth(i) permet de choisir le i-ème élément précisément 
    // (le premier, le deuxième, etc.). Sans ça, Playwright ne saurait pas lequel des 6 on veux cibler.

    const actualName = await page.locator('[data-test="inventory-item-name"]').textContent();
    expect(actualName).toBe(expectedName);

    await page.goBack();
    // page.goBack() : équivalent du bouton "précédent" du navigateur — pour revenir sur la page Inventory 
    // après chaque clic, et pouvoir tester le produit suivant dans la boucle.
  }
});
test('Add to cart from item detail page should reliably update the cart', async ({ page }) => {
  test.fail(); // This test should fail because the badge count doesn't always match what's actually in the cart

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();

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
  //Number(badgeText). Le badge renvoie du texte (.textContent() donne toujours une chaîne, genre "4"),
  //  mais actualItemsInCart (résultat de .count()) est un vrai nombre. Pour comparer les deux avec .toBe(...),
  //  il faut qu'ils soient du même type — Number(...) convertit le texte "4" en nombre 4.
});
test('First Name and Last Name fields should not overwrite each other', async ({ page }) => {
  test.fail(); // This test should fail because typing in Last Name overwrites First Name (shared field id)

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('Sebastien');
  await page.locator('[data-test="lastName"]').fill('Chup');

  expect(await page.locator('[data-test="firstName"]').inputValue()).toBe('Sebastien');
  expect(await page.locator('[data-test="lastName"]').inputValue()).toBe('Chup');
});
});