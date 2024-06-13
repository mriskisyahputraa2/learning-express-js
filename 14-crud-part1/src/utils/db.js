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
