import validator from "validator"; // import validator untuk validasi barang

// function sanitization, untuk membersihkan
const sanitization = (data) => {
  return {
    // escape: untuk mengubah karakter khusus seperti <, >, &, dll. menjadi lebih aman agar terhindar dari (Cross-Site Scripting)
    // trim:  Menghapus spasi di awal dan akhir string untuk setiap atribut
    nama_barang: validator.escape(validator.trim(data.nama_barang)),
    jumlah: validator.escape(validator.trim(data.jumlah)),
    harga_satuan: validator.escape(validator.trim(data.harga_satuan)),
    expire_date: validator.escape(validator.trim(data.expire_date)),
  };
};

// function validasi barang, (dt berisi data barang)
const barangValid = (dt) => {
  let message = []; // array kosong tempat menampung pesan kesalahan
  let data = sanitization(dt); // Memanggil fungsi sanitization untuk membersihkan data yang diterima.

  // validasi message kesalahan
  if (validator.isEmpty(data.nama_barang)) {
    message.push("Nama barang tidak boleh kosong");
  }
  if (validator.isEmpty(data.jumlah)) {
    message.push("Jumlah tidak boleh kosong");
  }
  if (validator.isEmpty(data.harga_satuan)) {
    message.push("Harga satuan tidak boleh kosong");
  }

  // mengembalikan message kesalahan dan data yg diinputkan oleh pengguna
  return { message, data };
};

export default barangValid;
