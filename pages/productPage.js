class ProductPage {
  constructor(page) {
    this.page = page;
    
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
    await this.products.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.products.first().click();
      await this.name.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async addToBasket() {
    await this.addToCartBtn.click();
  }
}

module.exports = { ProductPage };