import { test, expect } from '@playwright/test';

test('Authentification', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.token).toBeDefined();
});