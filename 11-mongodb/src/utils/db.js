// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
// };

// mongoose
//   .connect(process.env.MONGO_URL, options)
//   .then(() => {
//     console.log("berhasil koneksi");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

// export default mongoose;

import mongoose from "mongoose"; //Mengimpor Mongoose, digunakan untuk berinteraksi dengan MongoDB dalam aplikasi Node.js.
import "dotenv/config"; // Mengimpor dan mengkonfigurasi dotenv, untuk memuat variabel lingkungan dari file .env ke dalam process.env.

// menghubungkan / mengkoneksikan ke mongodb
mongoose
  .connect(process.env.MONGO_URL) // menghubungkan ke aplikasi mongodb didalam file .env dengan nama yang sesuai yaitu "MONGO_URL"
  // jika berhasil
  .then(() => {
    console.log("berhasil koneksi"); // tampilkan pesan ini
  })
  // jika gagal
  .catch((err) => {
    console.log(err); // tampilkan error
  });

export default mongoose; // Mengekspor instansi Mongoose yang telah dikonfigurasi untuk digunakan di bagian file-file lain dari aplikasi.
