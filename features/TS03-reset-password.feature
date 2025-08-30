Feature: Reset Password

  Scenario: TC011 - Cek validasi gagal reset password dengan tidak mengisi nomor whatsapp
    Given user membuka halaman reset password
    When user klik tombol Cari Akun
    Then muncul peringatan reset password "Ada field yang belum terisi!"

  Scenario: TC012 - Cek validasi gagal reset password karena menggunakan nomor whatsapp yang belum terdaftar
    Given user membuka halaman reset password
    When user mengisi nomor telepon untuk reset password yaitu "0846374652432"
    And user klik tombol Cari Akun
    Then muncul peringatan reset password "Akun tidak ditemukan. Coba lagi dengan No. Whatsapp lain."

  Scenario: TC013 - Cek validasi gagal reset password karena menggunakan nomor whatsapp yang tidak valid
    Given user membuka halaman reset password
    When user mengisi nomor telepon untuk reset password yaitu "08463"
    And user klik tombol Cari Akun
    Then muncul peringatan reset password "No. Whatsapp minimal 8 digit!"

  Scenario: TC014 - Cek validasi lolos dari halaman reset password dengan mengisi nomor whatsapp yang terdaftar
    Given user membuka halaman reset password
    When user mengisi nomor telepon yang sudah terdaftar
    And user klik tombol Cari Akun
    Then user berhasil diarahkan ke halaman OTP