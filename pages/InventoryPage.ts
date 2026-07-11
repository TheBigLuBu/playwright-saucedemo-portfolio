import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async removeFromCart(productName: string) {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }

  async getBadgeCount(): Promise<string | null> {
    return await this.shoppingCartBadge.textContent();
  }

  async isBadgeVisible(): Promise<boolean> {
    return await this.shoppingCartBadge.isVisible();
  }
}