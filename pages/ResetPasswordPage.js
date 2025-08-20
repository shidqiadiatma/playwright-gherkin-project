const { expect } = require('@playwright/test');

class ResetPasswordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nomorWhatsappInput = page.getByPlaceholder('No. Whatsapp');
    this.cariAkunButton = page.getByText('Cari Akun');
    this.otpButton = page.getByRole('button', { name: 'Kirim ulang OTP' });
  }

  async goto() {
    await this.page.goto('https://muatmuat.com/login/forgot_password');
  }

  async fillNomorWhatsapp(nomor) {
    await this.nomorWhatsappInput.fill(nomor);
  }

  async clickCariAkun() {
    await this.cariAkunButton.click();
    await this.page.waitForTimeout(500);
  }

  async expectWarning(message) {
    // Ambil seluruh text yang muncul di halaman
    const bodyText = await this.page.locator('body').textContent();
    if (!bodyText || !bodyText.includes(message)) {
      await this.page.screenshot({ path: 'error-resetpassword.png' });
      throw new Error(`Expected warning "${message}" not found in page body!`);
    }
  }

  async fillOTP() {
    await this.page.locator('#OTPField1').fill('123456');
    await this.page.waitForTimeout(500);
    await this.page.locator('#OTPField2').fill('2');
    await this.page.waitForTimeout(500);
    await this.page.locator('#OTPField3').fill('3');
    await this.page.waitForTimeout(500);
    await this.page.locator('#OTPField4').fill('4');
    await this.page.waitForTimeout(500);
    await this.page.locator('#OTPField5').fill('5');
    await this.page.waitForTimeout(500);
    await this.page.locator('#OTPField6').click();
    await this.page.locator('#OTPField6').fill('6');
  }

  async expectOTPPage() {
    await this.otpButton.waitFor({ timeout: 10000 });
    const bodyText = await this.page.locator('body').textContent();
    if (!bodyText.includes('Masukkan OTP')) {
      await this.page.screenshot({ path: 'error-otp-page.png' });
      throw new Error('Tidak berhasil ke halaman OTP!');
    }
  }

  async expectOTPError(message = 'OTP yang Anda masukkan salah!') {
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator('#TxtRedAlert')).toContainText(message);
  }
}

module.exports = { ResetPasswordPage };