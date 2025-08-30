# Playwright Automation Testing Framework

Framework automation testing menggunakan Playwright dengan Cucumber.

## Fitur yang Tersedia

### Test Scenarios
- **TS01 - Register**: Test case untuk proses pendaftaran akun baru
- **TS02 - Login**: Test case untuk proses login dengan berbagai skenario
- **TS03 - Reset Password**: Test case untuk proses reset password

### Page Objects
- `LoginPage.js` - Halaman login
- `RegisterPage.js` - Halaman pendaftaran  
- `ResetPasswordPage.js` - Halaman reset password

### Reporting
- **HTML Report**: Report otomatis di-generate menggunakan formatter Cucumber (misal html) sesuai konfigurasi saat menjalankan test.

## Cara Menjalankan Automation

### 1. Install dependencies
```powershell
npm install
```

### 2. Jalankan semua skenario (semua file feature)
```powershell
npx cucumber-js
```
atau jalankan secara interaktif (jika ada setup runner interaktif):
```powershell
# Jika menggunakan Playwright Test runner, bisa gunakan:
npx playwright test
```

### 3. Jalankan file feature tertentu
```powershell
# Jalankan test register
npx cucumber-js features/TS01-register.feature

# Jalankan test login
npx cucumber-js features/TS02-login.feature

# Jalankan test reset password
npx cucumber-js features/TS03-reset-password.feature
```

## Generate & Tampilkan Report

### HTML Report
Untuk membuat laporan hasil test dalam format HTML, jalankan:
```powershell
npx cucumber-js --require features/support/world.js --format html:cucumber-report.html
```
File `cucumber-report.html` akan muncul di folder project, bisa dibuka di browser untuk melihat hasil report.

## Struktur Project
```
features/
├── TS01-register.feature
├── TS02-login.feature
├── TS03-reset-password.feature
├── step_definitions/
│   ├── login.steps.js
│   ├── register.steps.js
│   └── resetpassword.steps.js
└── support/
    ├── credential.json      # Data test (credentials)
    └── world.js             # Custom world dan hooks

pages/                      # Page Object Models
├── LoginPage.js
├── RegisterPage.js
└── ResetPasswordPage.js

playwright.config.js        # Konfigurasi Playwright
package.json                # Dependencies dan scripts
README.MD                  # Dokumentasi ini
```

## Data Test
File `features/support/credential.json` berisi data login yang digunakan untuk testing:
- Nomor WhatsApp terdaftar
- Password benar dan salah
- Nomor WhatsApp tidak terdaftar

## Konfigurasi
File `playwright.config.js` berisi konfigurasi Playwright dengan:
- Browser: Chromium, Firefox, Webkit
- Timeout: 60 detik (default)
- Parallel test execution
- Reporter: list dengan printSteps
- Launch options: browser fullscreen

## Troubleshooting
- Pastikan browser Chromium, Firefox, atau Webkit sudah terinstall (Playwright akan menginstall otomatis saat setup)
- Pastikan dependencies terinstall dengan `npm install`
- Jika ada error selector, periksa elemen UI di halaman target dan update Page Object jika perlu
- Simpan data rahasia seperti password di file `features/support/credential.json`
- Tambahkan file `credential.json` ke `.gitignore` agar tidak ter-push ke repository
- Gunakan `npx playwright show-trace` untuk melihat trace jika test gagal dan trace diaktifkan
