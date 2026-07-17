import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { allure } from 'allure-playwright';

test.use({ storageState: 'playwright/.auth/standard-user.json' })

test.describe('Checkout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    //await loginPage.goto(); ===> Enlevé suite à l'ajout du test.use au-dessus afin d'éviter de retester ça à chaque fois
    //await loginPage.login('standard_user', 'secret_sauce'); ==> Enlevé suite à l'ajout du test.use au-dessus afin d'éviter de retester ça à chaque fois 
    await page.goto('https://www.saucedemo.com/inventory.html'); // ajouté suite au nouveau test.use
  });

test('First name missing', async ({ page }) => {
  await allure.epic('Order');
  await allure.feature('Checkout');
  await allure.story('First name missing');
  await allure.severity('normal');

  await test.step('Go to cart and start checkout', async () => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
  });

  await test.step('Attempt to continue without first name', async () => {
    await checkoutPage.continueCheckout();
  });

  await test.step('Verify the displayed error message', async () => {
    expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
  });
});

test('Last name missing', async ({ page }) => {
  await allure.epic('Order');
  await allure.feature('Checkout');
  await allure.story('Last name missing');
  await allure.severity('normal');

  await test.step('Go to cart and start checkout', async () => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
  });

  await test.step('Fill in first name only', async () => {
    await checkoutPage.fillFirstName('chup');
  });

  await test.step('Attempt to continue without last name', async () => {
    await checkoutPage.continueCheckout();
  });

  await test.step('Verify the displayed error message', async () => {
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Last Name is required');
  });
});

test('Postal code missing', async ({ page }) => {
  await allure.epic('Order');
  await allure.feature('Checkout');
  await allure.story('Postal code missing');
  await allure.severity('normal');

  await test.step('Go to cart and start checkout', async () => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
  });

  await test.step('Fill in first and last name only', async () => {
    await checkoutPage.fillFirstName('Seb');
    await checkoutPage.fillLastName('Chup');
  });

  await test.step('Attempt to continue without postal code', async () => {
    await checkoutPage.continueCheckout();
  });

  await test.step('Verify the displayed error message', async () => {
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Postal Code is required');
  });
});

test('Cancelling checkout', async ({ page }) => {
  await allure.epic('Order');
  await allure.feature('Checkout');
  await allure.story('Cancelling checkout');
  await allure.severity('normal');

  await test.step('Add a product to the cart', async () => {
    await inventoryPage.addToCart('sauce-labs-backpack');
  });

  await test.step('Go to cart and start checkout', async () => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
  });

  await test.step('Fill in shipping information', async () => {
    await checkoutPage.fillFirstName('Sebastien');
    await checkoutPage.fillLastName('chup');
    await checkoutPage.fillPostalCode('60300');
    await checkoutPage.continueCheckout();
  });

  await test.step('Cancel the checkout', async () => {
    await checkoutPage.cancelCheckout();
  });

  await test.step('Verify return to inventory page with cart preserved', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    expect(await inventoryPage.getBadgeCount()).toBe('1');
  });
});

test('Checking total price', async ({ page }) => {
  await allure.epic('Order');
  await allure.feature('Checkout');
  await allure.story('Total price calculation');
  await allure.severity('critical');

  await test.step('Add a product to the cart', async () => {
    await inventoryPage.addToCart('sauce-labs-backpack');
  });

  await test.step('Go to cart and start checkout', async () => {
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
  });

  await test.step('Fill in shipping information', async () => {
    await checkoutPage.fillFirstName('Sebastien');
    await checkoutPage.fillLastName('chup');
    await checkoutPage.fillPostalCode('60300');
    await checkoutPage.continueCheckout();
  });

  await test.step('Verify subtotal + tax equals total', async () => {
    const subtotalText = await checkoutPage.getSubtotal();
    const subtotal = parseFloat(subtotalText!.split('$')[1]);
    const taxText = await checkoutPage.getTax();
    const tax = parseFloat(taxText!.split('$')[1]);
    const totalText = await checkoutPage.getTotal();
    const total = parseFloat(totalText!.split('$')[1]);

    expect(subtotal + tax).toBeCloseTo(total, 2);
  });
});

test('Order completed', async ({ page }) => {
    // ... contenu inchangé
  });
});   // ← ferme test.describe('Checkout', ...)

test.describe('Continue Shopping', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Go back to Shopping items list', async ({ page }) => {
    await allure.epic('Shopping list');
    await allure.feature('Cart');
    await allure.story('Access to Shopping list');
    await allure.severity('minor');

    await test.step('Add a product to the cart', async () => {
      await inventoryPage.addToCart('sauce-labs-backpack');
    });

    await test.step('Go to cart', async () => {
      await checkoutPage.goToCart();
    });

    await test.step('Click Continue Shopping', async () => {
      await checkoutPage.continueShopping();
    });

    await test.step('Verify return to the inventory page', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
  });
}); 