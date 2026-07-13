import { test as setup } from '@playwright/test';

const standardUserFile = 'playwright/.auth/standard-user.json';

setup('authenticate as standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: standardUserFile });
});

const problemUserFile = 'playwright/.auth/problem-user.json';

setup('authenticate as problem_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: problemUserFile });
});