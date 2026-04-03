const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../pages/authPage');
const { ProductPage } = require('../pages/productPage');

test('User signs up with valid credentials', async ({ page }) => {
  const auth = new AuthPage(page);

  await auth.openLogin();
  await auth.goToRegister();

  // Generate unique email for each test run
  const email = `user${Date.now()}@mail.com`;

  await auth.register({
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    street: 'Street 1',
    postalCode: '12345',
    city: 'Yerevan',
    state: 'Yerevan',
    country: 'Armenia',
    phone: '123456789',
    email,
    password: 'Password123'
  });

  // Check login form is visible instead of URL
  await expect(auth.email).toBeVisible();
});

test('User signs in with valid credentials', async ({ page }) => {
  const auth = new AuthPage(page);

  await auth.openLogin();
  await auth.login('customer@practicesoftwaretesting.com', 'welcome01');

  // Verify that user sees "My account" page title
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
});

test('User views product details', async ({ page }) => {
  const product = new ProductPage(page);

  await product.openHome();
  await product.openFirstProduct();

  await expect(product.name).toBeVisible();
  await expect(product.price).toBeVisible();
  await expect(product.description).toBeVisible();
  await expect(product.image).toBeVisible();
});

test('User adds product to basket', async ({ page }) => {
  const product = new ProductPage(page);

  await product.openHome();
  await product.openFirstProduct();

  await product.addToBasket();

  const count = await product.cartCount.innerText();
  expect(Number(count)).toBeGreaterThan(0);
});