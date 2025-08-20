const { Given, When, Then } = require('@cucumber/cucumber');
const { RegisterPage } = require('../../pages/RegisterPage');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(10000); // 10 detik
let registerPage;

Given('user membuka halaman register', async function () {
  registerPage = new RegisterPage(this.page);
  await registerPage.goto();
});

When('user mengisi nama lengkap {string}', async function (namaLengkap) {
  await registerPage.namaLengkap.fill(namaLengkap);
});

When('user mengisi nomor whatsapp untuk register yang belum terdaftar', async function () {
  // Ganti dengan nomor yang belum pernah dipakai untuk test
  await registerPage.nomorTelepon.fill('0878632582323');
});

When('user mengisi nomor whatsapp untuk register yang sudah terdaftar', async function () {
  // Ganti dengan nomor yang sudah pernah dipakai untuk test
  await registerPage.nomorTelepon.fill('089654961080');
});

When('user mengisi password {string}', async function (password) {
  await registerPage.password.fill(password);
});

When('user mengisi konfirmasi password {string}', async function (konfirmasiPassword) {
  await registerPage.konfirmasiPassword.fill(konfirmasiPassword);
});

When('user klik tombol Daftar', async function () {
  await registerPage.klikDaftar();
});

When('user klik tombol Daftarr', async function () {
  // Jika typo di feature, tetap jalankan klik tombol daftar
  await registerPage.daftarButton.click();
});

When('user hanya mengisi password {string} dan konfirmasi password {string}', async function (password, konfirmasiPassword) {
  await registerPage.password.fill(password);
  await registerPage.konfirmasiPassword.fill(konfirmasiPassword);
});

When('user mengisi password {string} dan konfirmasi password {string}', async function (password, konfirmasiPassword) {
  await registerPage.password.fill(password);
  await registerPage.konfirmasiPassword.fill(konfirmasiPassword);
});

// Assertion untuk peringatan password tidak sama
Then('muncul peringatan yaitu "Password tidak sama"', async function () {
  await registerPage.expectPasswordNotIdentical();
});

// Assertion untuk peringatan registrasi
Then('muncul peringatan registrasi {string}', async function (message) {
  await registerPage.expectWarningErrorText(message);
});

// Assertion untuk berhasil ke halaman Syarat dan Ketentuan Pengguna
Then('user berhasil diarahkan ke halaman Syarat dan Ketentuan Pengguna', async function () {
  await registerPage.expectSyaratKetentuan();
});