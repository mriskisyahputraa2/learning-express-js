import bcrypt from "bcrypt"; // import bcrypt untuk membuat password hash menjadi password acak

const salRound = 10; // menetapkan bahwa kita akan menggunakan 10 ronde salt untuk membuat password lebih aman. Salt adalah data acak yang ditambahkan ke password sebelum di-hash.

// encript adalah fungsi yang mengubah password pengguna menjadi bentuk hash yang sulit dibaca.
const encript = (password) => {
  return bcrypt.hash(password, salRound); // mengembalikan password acak dengan salRound yang sudah ditentukan
};

// compare adalah fungsi yang memeriksa apakah password yang dimasukkan pengguna sesuai dengan hash yang sudah disimpan di database.
const compare = (password, hash) => {
  return bcrypt.compare(password, hash); // mengembalikan password acak yang sudah dicocokkan oleh encript
};

export { encript, compare }; // export encript, compare supaya bisa digunakan di halaman/file lain
