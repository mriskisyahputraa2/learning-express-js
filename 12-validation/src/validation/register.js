import validator from "validator"; //import validator berfungsi untuk validasi dan sanitasi/pembersih string.

// function sanitization/pembersih, untuk menerima objek data yang berisi informasi pengguna (nama, email, dan password).
// Fungsi ini membersihkan data input pengguna untuk memastikan tidak ada karakter berbahaya dan menghilangkan spasi yang tidak diperlukan.
const sanitization = (data) => {
  // kembalikan
  return {
    // mengembalikan validasi nama dan email yang menghapus spasi awal dan akhir(escape) string 'nama', 'email' mengubah karakter khusus menjadi aman untuk HTML(trim)
    nama: validator.escape(validator.trim(data.nama)),
    email: validator.escape(validator.trim(data.email)),
    password: validator.trim(data.password), // password hanya menghapus spasi awal dan akhir(escape) aja, karna trim tidak perlu digunakan
  };
};

// function utk memvalidasi data yang telah dibersihkan oleh sanitization
const regValid = (dt) => {
  let message = []; // array kosong untuk menyimpan pesan error
  let data = sanitization(dt); // membersihkan data input menggunakan fungsi sanitization.

  // validasi, jika data 'nama' kosong maka tampilkan pesan errornya
  if (validator.isEmpty(data.nama)) {
    message.push("Nama tidak boleh kosong!");
  }

  // validasi, jika data 'email' kosong maka tampilkan pesan errornya
  if (validator.isEmpty(data.email)) {
    message.push("Email tidak boleh kosong!");
  }

  // validasi apakah 'email' valid. Jika tidak valid, tampilkan pesan errornya.
  if (!validator.isEmail(data.email)) {
    message.push("Email tidak valild!");
  }

  // validasi, jika data 'password' kosong maka tampilkan pesan errornya
  if (!validator.isEmpty(data.password)) {
    message.push("Password tidak boleh kosong!");
  }

  // validasi, apakah password nya kuat dan akurat jika tidak, tampilkan pesan errornya
  if (!validator.isStrongPassword(data.password)) {
    message.push(
      "Password harus terdiri dari 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, 1 simbol"
    );
  }

  // Mengembalikan objek yang berisi array pesan error (message) dan data yang telah disanitasi (data).
  return { message, data };
};

export default regValid;

// menit 11
