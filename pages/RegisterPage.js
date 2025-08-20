// RegisterPage.js - Page Object Model untuk halaman register
const { expect } = require('@playwright/test');
class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.namaLengkap = page.getByRole('textbox', { name: 'Nama Lengkap' });
    this.nomorTelepon = page.locator('#inpNomorTelepon');
    this.password = page.getByPlaceholder('Password', { exact: true });
    this.konfirmasiPassword = page.getByPlaceholder('Konfirmasi Password');
    this.daftarButton = page.getByText('Daftar', { exact: true });
    this.passwordNotIdentical = page.locator('#passwordNotIdentical');
    this.warningErrorText = page.locator('#warningErrorText');
  }

  async goto() {
    await this.page.goto('https://muatmuat.com/register/email');
  }

  async isiForm({ namaLengkap, nomorTelepon, password, konfirmasiPassword }) {
    if (namaLengkap !== undefined) await this.namaLengkap.fill(namaLengkap);
    if (nomorTelepon !== undefined) await this.nomorTelepon.fill(nomorTelepon);
    if (password !== undefined) await this.password.fill(password);
    if (konfirmasiPassword !== undefined) await this.konfirmasiPassword.fill(konfirmasiPassword);
  }

  async klikDaftar() {
    await this.daftarButton.click();
  }

  async expectPasswordNotIdentical() {
    await expect(this.passwordNotIdentical).toBeVisible();
    await expect(this.passwordNotIdentical).toContainText('Password tidak sama!');
  }

  async expectWarningErrorText(text) {
    await expect(this.warningErrorText).toContainText(text);
  }

  async expectSyaratKetentuan() {
  await this.page.waitForSelector('#lblSyaratKetentuan', { timeout: 10000 });
  const text = await this.page.locator('#lblSyaratKetentuan').textContent();
  if (!text || !text.includes('Syarat dan Ketentuan Pengguna')) {
    await this.page.screenshot({ path: 'error-register-snk.png' });
    throw new Error('Tidak berhasil ke halaman Syarat dan Ketentuan Pengguna!');
  }
}
}


module.exports = { RegisterPage };
