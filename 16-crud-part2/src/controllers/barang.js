import barangCollection from "../models/barang.js";
import barangValid from "../validation/barang.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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
    const out = barangValid(req.body);

    if (out.message.length > 0) {
      req.flash("message", ["error", "Gagal", out.message[0]]);
      req.flash("data", out.data);
      req.redirect("/barang/insert");
    } else {
      // data yang sudah dimasukkan sesauai dengan collectionya, akan disimpan didalam database barang
      const hasil = await barangCollection.insertMany([out.data]);

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
    }
    // jika data yang dimasukkan tidak sesuai maka munculkan error
  } catch (err) {
    next(err);
  }
};

// function editBarang
const editBarang = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const barang = await barangCollection.find({ id: new ObjectId(id) });
    const editData = req.flash("data")[0];
    if (editData) {
      const data = {
        title: "Edit Barang",
        layout: "layout/main",
        message: req.flash("message"),
        data: barang,
      };
      res.render("barang/edit");
    }
  } catch (err) {
    next(err);
  }
};

const setEditBarang = async (req, res, next) => {
  try {
    const { id, mode } = req.body;
    const out = barangValid(req.body);
    const outError = [{ _id: new ObjectId(id), ...out.data }];

    if (out.message.length > 0) {
      req.flash("message", ["error", "Gagal", out.message[0]]);
      req.flash("data", outError);
      req.redirect(`/barang/${id}`);
    } else {
      if (mode == "update") {
        const hasil = await barangCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: out.data }
        );
        if (hasil) {
          req.flash("message", [
            "success",
            "Berhasil",
            "Berhasil mengubah barang",
          ]);
          req.redirect("/barang");
        } else {
          req.flash("message", ["error", "Gagal", "Gagal mengubah barang"]);
          req.redirect(`/barang/${id}`);
        }
      } else {
        const hasil = await barangCollection.deleteOne(
          { _id: new ObjectId(id) },
          { $set: out.data }
        );
        if (hasil) {
          req.flash("message", [
            "success",
            "Berhasil",
            "Berhasil menghapus barang",
          ]);
          req.redirect("/barang");
        } else {
          req.flash("message", ["error", "Gagal", "Gagal menghapus barang"]);
          req.redirect(`/barang/${id}`);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

export { getAllBarang, insertBarang, setNewBarang, editBarang, setEditBarang };
