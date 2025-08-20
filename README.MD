# Playwright MuatMuat Cucumber Project

## Struktur Folder

```
features/
  TS01-register.feature
  login.feature
  register.feature
  reset-password.feature
support/
  step_definitions/
    login.steps.js
    register.steps.js
    resetpassword.steps.js
  pages/
    LoginPage.js
    RegisterPage.js
    ResetPasswordPage.js
```

## Prasyarat

- Node.js & npm sudah terinstall
- Sudah menjalankan `npm install` di folder project

## Cara Menjalankan Semua Test

1. **Install dependencies (hanya sekali):**
   ```
   npm install
   ```

2. **Jalankan semua skenario di semua file `.feature`:**
   ```
   npx cucumber-js
   ```

3. **Jalankan satu file feature saja (misal register):**
   ```
   npx cucumber-js features/TS01-register.feature
   ```

## Generate HTML Report

Untuk membuat laporan hasil test dalam format HTML:
```
npx cucumber-js --require support/world.js --format html:report.html
```
File `report.html` akan muncul di folder project, bisa dibuka di browser.

## Timeout Step

Jika ada step yang membutuhkan waktu lebih lama, tambahkan di awal file step definition:
```javascript
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(10000); // 10 detik
```

## Catatan

- Pastikan wording step di file `.feature` sama persis dengan di file step definition.
- Semua path import di step definition harus menggunakan:
  ```javascript
  const { NamaPage } = require('../pages/NamaPage');
  ```
- Untuk custom world (browser context), pastikan file `support/world.js` sudah ada dan di-require saat menjalankan test.