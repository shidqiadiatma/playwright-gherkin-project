Feature: Login

  Scenario: TC007 - Cek validasi gagal login dengan credential yang salah
    Given user membuka halaman login
    When user mengisi nomor whatsapp yang sudah terdaftar
    And user mengisi password yang salah
    And user klik tombol Masuk
    Then muncul peringatan "Email/Password yang Anda masukan salah, Silakan coba lagi!"

  Scenario: TC008 - Cek validasi gagal login dengan tidak mengisi password
    Given user membuka halaman login
    When user mengisi nomor whatsapp yang sudah terdaftar
    And user klik tombol Masuk
    Then muncul peringatan "Password belum terisi"

  Scenario: TC009 - Cek validasi gagal login dengan tidak mengisi email/no. whatsapp
    Given user membuka halaman login
    When user mengisi password yang benar
    And user klik tombol Masuk
    Then muncul peringatan "Email belum terisi"

  Scenario: TC010 - Cek validasi berhasil login dengan credential yang benar
    Given user membuka halaman login
    When user mengisi nomor whatsapp yang sudah terdaftar
    And user mengisi password yang benar
    And user klik tombol Masuk
    Then user berhasil login dan diarahkan ke halaman utama
