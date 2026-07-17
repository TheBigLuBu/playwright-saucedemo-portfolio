import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;
  readonly hamburgerMenuButton: Locator;
  readonly menuWrap: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.hamburgerMenuButton = page.locator('#react-burger-menu-btn');
    this.menuWrap = page.locator('.bm-menu-wrap');
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

async openHamburgerMenu() {
  // Neutralise l'animation AVANT le clic pour que l'ouverture soit instantanée, sans transition
  await this.page.addStyleTag({ content: '.bm-menu-wrap, .bm-item-list, .bm-item { transition: none !important; }' });

  await expect(this.hamburgerMenuButton).toBeVisible();
  await this.hamburgerMenuButton.click();

  try {
    await expect(this.menuWrap).toBeVisible({ timeout: 5000 });
  } catch {
    await this.hamburgerMenuButton.click();
    await expect(this.menuWrap).toBeVisible();
  }
}}
