const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    this.context = await this.browser.newContext({ viewport: null });
    this.page = await this.context.newPage();
  }
  async closeBrowser() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
