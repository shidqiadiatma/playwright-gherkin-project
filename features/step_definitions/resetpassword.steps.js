const { Given, When, Then } = require('@cucumber/cucumber');
const { ResetPasswordPage } = require('../../pages/ResetPasswordPage');
const testdata = require('../support/credential.json');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(10000); 
let resetPasswordPage;

Given('user membuka halaman reset password', async function () {
  resetPasswordPage = new ResetPasswordPage(this.page);
  await resetPasswordPage.goto();
});

When('user mengisi nomor telepon untuk reset password yaitu {string}', async function (nomorTelepon) {
  await resetPasswordPage.fillNomorWhatsapp(nomorTelepon);
});

When('user mengisi nomor telepon yang sudah terdaftar', async function () {
  await resetPasswordPage.fillNomorWhatsapp(testdata.nomorSudahTerdaftar);
});

When('user klik tombol Cari Akun', async function () {
  await resetPasswordPage.clickCariAkun();
  await resetPasswordPage.page.waitForTimeout(500);
});

When('user mengisi kode OTP yang salah', async function () {
  await resetPasswordPage.fillOTP('123456');
});

Then('muncul peringatan reset password {string}', async function (message) {
  await resetPasswordPage.expectWarning(message);
});

Then('user berhasil diarahkan ke halaman OTP', async function () {
  await resetPasswordPage.expectOTPPage();
});

Then('muncul peringatan bahwa kode {string}', async function (message) {
  await resetPasswordPage.expectOTPError(message);
});
