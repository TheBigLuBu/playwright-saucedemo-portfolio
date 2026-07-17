import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { allure } from 'allure-playwright';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

 test('login success', async ({ page }) => {
  await allure.epic('Authentication');
  await allure.feature('Login');
  await allure.story('Valid credentials');
  await allure.severity('critical');

  await test.step('Log in with a standard user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Verify redirection to the inventory page', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  await test.step('Verify the page title', async () => {
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});

test('login failed', async ({ page }) => {
  await allure.epic('Authentication');
  await allure.feature('Login');
  await allure.story('Locked out user');
  await allure.severity('minor');

  await test.step('Attempt login with a locked out account', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
  });

  await test.step('Verify the displayed error message', async () => {
    await expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.');
  });
 });
});