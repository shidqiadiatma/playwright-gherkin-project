const { Before, After, Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/LoginPage');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(10000); // 10 detik

let loginPage;

Before(async function () {
  await this.openBrowser();
});

After(async function () {
  await this.closeBrowser();
});

Given('user membuka halaman login', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('user mengisi nomor whatsapp yang sudah terdaftar', async function () {
  await loginPage.fillUsername('089654961080');
});

When('user mengisi password yang salah', async function () {
  await loginPage.fillPassword('passwordSalah123');
});

When('user mengisi password yang benar', async function () {
  await loginPage.fillPassword('Az12345678');
});

When('user klik tombol Masuk', async function () {
  await loginPage.clickLogin();
});

Then('muncul peringatan {string}', async function (message) {
  await loginPage.expectWarning(message);
});

Then('user berhasil login dan diarahkan ke halaman utama', async function () {
  await loginPage.expectProfileName('We CS QCF Sepuluh');
});