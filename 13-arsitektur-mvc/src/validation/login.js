import validator from "validator"; //import validator berfungsi untuk validasi dan sanitasi/pembersih string.

// function sanitization/pembersih, untuk menerima objek data yang berisi informasi pengguna (nama, email, dan password).
// Fungsi ini membersihkan data input pengguna untuk memastikan tidak ada karakter berbahaya dan menghilangkan spasi yang tidak diperlukan.
const sanitization = (data) => {
  // kembalikan
  return {
    // mengembalikan validasi email yang menghapus spasi awal dan akhir(escape) string 'email' mengubah karakter khusus menjadi aman untuk HTML(trim)
    email: validator.escape(validator.trim(data.email)),
    password: validator.trim(data.password), // password hanya menghapus spasi awal dan akhir(escape) aja, karna trim tidak perlu digunakan
  };
};

// function utk memvalidasi data yang telah dibersihkan oleh sanitization
const loginValid = (dt) => {
  let message = []; // array kosong untuk menyimpan pesan error
  let data = sanitization(dt); // membersihkan data input menggunakan fungsi sanitization.

  // validasi, jika data 'email' kosong maka tampilkan pesan errornya
  if (validator.isEmpty(data.email)) {
    message.push("Email tidak boleh kosong!");
  }

  // validasi apakah 'email' valid. Jika tidak valid, tampilkan pesan errornya.
  if (!validator.isEmail(data.email)) {
    message.push("Email tidak valild!");
  }

  // validasi, jika data 'password' kosong maka tampilkan pesan errornya
  if (validator.isEmpty(data.password)) {
    message.push("Password tidak boleh kosong!");
  }

  // Mengembalikan objek yang berisi array pesan error (message) dan data yang telah disanitasi (data).
  return { message, data };
};

export default loginValid;
