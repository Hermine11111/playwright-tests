// pages/productPage.js
const PageActions = require('./utils/pageActions');

class ProductPage extends PageActions {
  constructor(page) {
    super(page); // Inherit methods from PageActions class
    // Page-specific locators
    this.products = page.locator('[data-test="product-name"]');
    this.name = page.locator('[data-test="product-name"]');
    this.price = page.locator('[data-test="unit-price"]');
    this.description = page.locator('[data-test="product-description"]');
    this.image = page.locator('app-detail img').first();

    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartCount = page.locator('[data-test="cart-quantity"]');
  }

  async openHome() {
    await this.page.goto('/');
  }

  async openFirstProduct() {
    await this.waitForElement(this.products.first()); // Uses core waitForElement
    await this.click(this.products.first()); // Uses core click method
  }

  async addToBasket() {
    await this.click(this.addToCartBtn); // Uses core click method
  }
}

module.exports = { ProductPage };