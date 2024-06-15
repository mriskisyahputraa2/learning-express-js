import mongoose from "../utils/db.js"; // Mengimpor Mongoose yang telah terhubung ke MongoDB dari file db.js yang terletak di direktori utils.

// mendefinisikan skema mongoose, untuk struktur data barang yang akan disimpan dalam database.
const barangSchema = new mongoose.Schema({
  nama_barang: {
    type: String,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  harga_satuan: {
    type: Number,
    required: true,
  },
  // untuk expire_date tidak wajib untuk dimasukkan
  expire_date: {
    type: Date,
    required: false,
  },
});

const barangCollection = mongoose.model("barang", barangSchema);
export default barangCollection;
