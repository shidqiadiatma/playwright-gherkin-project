const { expect } = require('@playwright/test');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('No. Whatsapp/Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('#btnMasuk');
    this.bannerCloseBtn = page.locator('#close-banner-promo');
    this.profileSpan = page.locator('xpath=/html/body/header[1]/div[2]/div/div[2]/button/span');
  }

  async goto() {
    await this.page.goto('https://muatmuat.com/login');
    await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async closeBannerPromoIfVisible() {
    try {
      if (await this.bannerCloseBtn.isVisible({ timeout: 3000 })) {
        await this.bannerCloseBtn.click();
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      // banner tidak muncul, lanjutkan saja
    }
  }

  async expectWarning(message) {
    const selectors = [
      '#warningWhatsapp', '#warningPassword', '#warningEmail',
      '.alert', '.error-message', '.modal', '.swal2-content', '.swal2-title',
      'span.title-warning'
    ];
    let found = false;
    for (const sel of selectors) {
      const elements = await this.page.locator(sel).all();
      for (const el of elements) {
        const text = await el.textContent();
        if (text && text.includes(message)) {
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      await this.page.screenshot({ path: 'error-login-warning.png' });
      throw new Error(`Expected "${message}" in one of selectors: ${selectors.join(', ')}`);
    }
  }

  async expectProfileName(name) {
    await this.closeBannerPromoIfVisible();
    await this.page.waitForTimeout(2000);
    await this.profileSpan.waitFor({ timeout: 20000 });
    const text = await this.profileSpan.textContent();
    if (!text || !text.includes(name)) {
      await this.page.screenshot({ path: 'error-login-profile.png' });
      throw new Error('Profil utama tidak ditemukan setelah login!');
    }
  }
}

module.exports = { LoginPage };