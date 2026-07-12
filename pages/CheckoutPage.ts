import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  async fillPostalCode(value: string) {
    await this.postalCodeInput.fill(value);
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  async getSubtotal(): Promise<string | null> {
    return await this.subtotalLabel.textContent();
  }

  async getTax(): Promise<string | null> {
    return await this.taxLabel.textContent();
  }

  async getTotal(): Promise<string | null> {
    return await this.totalLabel.textContent();
  }

  async getCompleteHeader(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }
}