class PageActions {
  constructor(page) {
    this.page = page;
  }

  // Utility function to click a locator
  async click(locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  // Utility function to fill a field
  async fill(locator, text) {
    await locator.fill(text);
  }

  // Utility function to wait for an element to be visible
  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  // Utility function to get the text content of an element
  async getText(locator) {
    return await locator.innerText();
  }
}

module.exports = PageActions;