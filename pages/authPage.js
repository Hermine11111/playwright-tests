// pages/authPage.js

const PageActions = require('../utils/pageActions');  // Import the utility functions from pageActions

class AuthPage extends PageActions {
  constructor(page) {
    super(page);  // Inherit utility functions from PageActions class
    
    // Login locators
    this.email = page.locator('[data-test="email"]').first();
    this.password = page.locator('[data-test="password"]').first();
    this.loginBtn = page.locator('[data-test="login-submit"]');
    this.registerLink = page.locator('[data-test="register-link"]');

    // Registration locators
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.street = page.locator('[data-test="street"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.phone = page.locator('[data-test="phone"]');
    this.registerBtn = page.locator('[data-test="register-submit"]');
  }

  // Open login page
  async openLogin() {
    await this.page.goto('/auth/login');
    await this.waitForElement(this.email);  // Using waitForElement from PageActions
  }

  // Login method
  async login(email, password) {
    await this.fill(this.email, email);  // Using fill from PageActions
    await this.fill(this.password, password);  // Using fill from PageActions
    await this.waitForElement(this.loginBtn);  // Using waitForElement from PageActions
    await this.click(this.loginBtn);  // Using click from PageActions
    await this.page.waitForURL(/account/, { timeout: 10000 });
  }

  // Go to registration form
  async goToRegister() {
    await this.click(this.registerLink);  // Using click from PageActions
    await this.waitForElement(this.firstName);  // Using waitForElement from PageActions
  }

  // Registration method (safe for SPA / slow loading)
  async register(user) {
    // Fill registration form using inherited fill method
    await this.fill(this.firstName, user.firstName);
    await this.fill(this.lastName, user.lastName);
    await this.fill(this.dob, user.dob);
    await this.fill(this.street, user.street);
    await this.fill(this.postalCode, user.postalCode);
    await this.fill(this.city, user.city);
    await this.fill(this.state, user.state);
    await this.country.selectOption({ label: user.country });
    await this.fill(this.phone, user.phone);

    // Fill visible email/password fields
    const regEmail = this.page.locator('[data-test="email"]:visible');
    const regPassword = this.page.locator('[data-test="password"]:visible');

    await regEmail.waitFor({ state: 'visible', timeout: 10000 });
    await regEmail.fill(user.email);

    await regPassword.waitFor({ state: 'visible', timeout: 10000 });
    await regPassword.fill(user.password);

    // Click register button using inherited click method
    await this.click(this.registerBtn);  // Using click from PageActions

    // Wait for login email field to appear instead of URL
    await this.waitForElement(this.email);  // Using waitForElement from PageActions
  }
}

module.exports = { AuthPage };  // Export the AuthPage class for use in tests