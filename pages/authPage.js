class AuthPage {
  constructor(page) {
    this.page = page;

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
    await this.email.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Login method
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginBtn.click();
    await this.page.waitForURL(/account/, { timeout: 10000 });
  }

  // Go to registration form
  async goToRegister() {
    await this.registerLink.click();
    await this.firstName.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Registration method (safe for SPA / slow loading)
  async register(user) {
    // Fill registration form
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.street.fill(user.street);
    await this.postalCode.fill(user.postalCode);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption({ label: user.country });
    await this.phone.fill(user.phone);

    // Fill visible email/password fields
    const regEmail = this.page.locator('[data-test="email"]:visible');
    const regPassword = this.page.locator('[data-test="password"]:visible');

    await regEmail.waitFor({ state: 'visible', timeout: 10000 });
    await regEmail.fill(user.email);

    await regPassword.waitFor({ state: 'visible', timeout: 10000 });
    await regPassword.fill(user.password);

    // Click register button
    await this.registerBtn.click();

    // Wait for login email field to appear instead of URL
    await this.email.waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = { AuthPage };