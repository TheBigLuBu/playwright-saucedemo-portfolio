import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login success', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('login failed', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.');
  });
});