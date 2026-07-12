import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('First name missing', async ({ page }) => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
  });

  test('Last name missing', async ({ page }) => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.fillFirstName('chup');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Last Name is required');
  });

  test('Postal code missing', async ({ page }) => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.fillFirstName('Seb');
    await checkoutPage.fillLastName('Chup');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Postal Code is required');
  });

  test('Cancelling checkout', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.fillFirstName('Sebastien');
    await checkoutPage.fillLastName('chup');
    await checkoutPage.fillPostalCode('60300');
    await checkoutPage.continueCheckout();
    await checkoutPage.cancelCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    expect(await inventoryPage.getBadgeCount()).toBe('1');
  });

  test('Checking total price', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.fillFirstName('Sebastien');
    await checkoutPage.fillLastName('chup');
    await checkoutPage.fillPostalCode('60300');
    await checkoutPage.continueCheckout();

    const subtotalText = await checkoutPage.getSubtotal();
    const subtotal = parseFloat(subtotalText!.split('$')[1]);
    const taxText = await checkoutPage.getTax();
    const tax = parseFloat(taxText!.split('$')[1]);
    const totalText = await checkoutPage.getTotal();
    const total = parseFloat(totalText!.split('$')[1]);

    expect(subtotal + tax).toBeCloseTo(total, 2);
  });

  test('Order completed', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.fillFirstName('Sebastien');
    await checkoutPage.fillLastName('chup');
    await checkoutPage.fillPostalCode('60300');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getTotal()).toContain('Total:');
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.getCompleteHeader()).toBe('Thank you for your order!');
  });
});

test.describe('Continue Shopping', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Go back to Shopping items list', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await checkoutPage.goToCart();
    await checkoutPage.continueShopping();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});