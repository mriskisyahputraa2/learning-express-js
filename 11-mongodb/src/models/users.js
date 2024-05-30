// import mongoose from "../utils/db.js";

// const logInSchema = new mongoose.Schema({
//   nama: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const logInCollection = mongoose.model("Users", logInSchema);

// export default logInCollection;

import mongoose from "../utils/db.js"; // Mengimpor Mongoose yang telah terhubung ke MongoDB dari file db.js yang terletak di direktori utils.

// mendefinisikan skema mongoose, untuk struktur data pengguna yang akan disimpan dalam database.
const logInSchema = new mongoose.Schema({
  // Data pengguna harus memiliki nama, email dan password yang bertipe teks (String) dan wajib diisi (required: true).
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// membuat model yang disebut logInCollection berdasarkan skema logInSchema.
// Model, ini adalah alat yang akan digunakan untuk berinteraksi dengan koleksi (tabel) Users di database MongoDB.
// Users, adalah nama koleksi di MongoDB yang akan menyimpan data pengguna.
const logInCollection = new mongoose.model("Users", logInSchema);

export default logInCollection; // Ini mengekspor model logInCollection sehingga bisa digunakan di file lain dalam proyek Anda.
