Feature: Registration

  Scenario: TC001 - Cek validasi gagal registrasi karena password tidak sama
    Given user membuka halaman register
    When user mengisi nama lengkap "Shidqi Adiatma"
    And user mengisi nomor whatsapp untuk register yang belum terdaftar
    And user mengisi password "PasswordBenar1"
    And user mengisi konfirmasi password "PasswordSalah"
    And user klik tombol Daftar
    Then muncul peringatan yaitu "Password tidak sama"

  Scenario: TC002 - Cek validasi gagal registrasi karena ada field yang belum terisi
    Given user membuka halaman register
    When user hanya mengisi password "PasswordBenar123" dan konfirmasi password "PasswordBenar123"
    And user klik tombol Daftarr
    Then muncul peringatan registrasi "Ada field yang belum terisi"

  Scenario: TC003 - Cek validasi gagal registrasi karena nomor whatsapp telah terdaftar
    Given user membuka halaman register
    When user mengisi nama lengkap "Shidqi Adiatma"
    And user mengisi nomor whatsapp untuk register yang sudah terdaftar
    And user mengisi password "PasswordBenar123" dan konfirmasi password "PasswordBenar123"
    And user klik tombol Daftar
    Then muncul peringatan registrasi "No. Whatsapp telah terdaftar!"

  Scenario: TC004 - Cek validasi gagal registrasi karena menggunakan nama lengkap yang tidak valid
    Given user membuka halaman register
    When user mengisi nama lengkap "Shidqi Adiatma123"
    And user mengisi nomor whatsapp untuk register yang belum terdaftar
    And user mengisi password "PasswordBenar123" dan konfirmasi password "PasswordBenar123"
    And user klik tombol Daftar
    Then muncul peringatan registrasi "Nama lengkap tidak valid!"

  Scenario: TC005 - Cek validasi gagal registrasi karena password tidak sesuai kriteria
    Given user membuka halaman register
    When user mengisi nama lengkap "Shidqi Adiatma"
    And user mengisi nomor whatsapp untuk register yang belum terdaftar
    And user mengisi password "PassAja" dan konfirmasi password "PassAja"
    And user klik tombol Daftar
    Then muncul peringatan registrasi "Password harus terdapat huruf kapital, huruf kecil, dan angka. Minimal terdapat 8 karakter!"
  
    Scenario: TC006 - Cek validasi lolos dari halaman registrasi menggunakan data yang sesuai
    Given user membuka halaman register
    When user mengisi nama lengkap "Shidqi Adiatma"
    And user mengisi nomor whatsapp untuk register yang belum terdaftar
    And user mengisi password "PasswordBenar123" dan konfirmasi password "PasswordBenar123"
    And user klik tombol Daftar
    Then user berhasil diarahkan ke halaman Syarat dan Ketentuan Pengguna
