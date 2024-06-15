import barangCollection from "../models/barang.js";

// function gettAllBarang, untuk mengambil semua barang dan menampilkannya di layar
const getAllBarang = async (req, res, next) => {
  // mencoba, mengambil data barang
  try {
    // mengambil semua(find) data barang
    const barang = await barangCollection.find({});

    // menyiapkan data untuk tampilan halaman barang
    const data = {
      title: "Barang",
      layout: "layout/main",
      message: req.flash("message"), // Mengambil pesan flash yang mungkin ada dari request menggunakan req.flash("message")
      data: barang,
    };
    res.render("barang/index", data);

    // menangkap error yang terjadi
  } catch (err) {
    next(err);
  }
};

// function insertBarang, untuk menampilkan halaman insert/tambah barang
const insertBarang = async (req, res, next) => {
  try {
    const data = {
      title: "Insert Barang",
      layout: "layout/main",
      message: req.flash("message"), //  Mengambil pesan flash yang mungkin ada dari request menggunakan req.flash("message").
      data: req.flash("data")[0], // Mengambil data dari flash message jika ada menggunakan req.flash("data")[0].
    };
    res.render("barang/insert", data);
  } catch (err) {
    next(err);
  }
};

// function setNewBarang, untuk menambahkan/add data ke dalam database barang
const setNewBarang = async (req, res, next) => {
  try {
    // mempersiapkan data barang baru yang diinputkan oleh pengguna
    const data = {
      nama_barang: req.body.nama_barang,
      jumlah: req.body.jumlah,
      harga_satuan: req.body.harga_satuan,
      expire_date: req.body.kaduluarsa,
    };

    // data yang sudah dimasukkan sesauai dengan collectionya, akan disimpan didalam database barang
    const hasil = await barangCollection.insertMany([data]);

    // validasi, jika datanya berhasil
    if (hasil) {
      // maka tampilkan pesan berhasil
      req.flash("message", [
        "success",
        "Berhasil",
        "Berhasil menambahkan barang baru!",
      ]);
      res.redirect("/barang");

      // jika tidak,
    } else {
      // maka tampilkan pesan gagal
      req.flash("message", [
        "error",
        "Gagal",
        "Gagal menambahkan barang baru!",
      ]);
      res.redirect("/barang");
    }

    // jika data yang dimasukkan tidak sesuai maka munculkan error
  } catch (err) {
    next(err);
  }
};

export { getAllBarang, insertBarang, setNewBarang };
