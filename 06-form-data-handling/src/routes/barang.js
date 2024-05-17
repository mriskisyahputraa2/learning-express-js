import express from "express";
const barangRouter = express.Router();

// menangkap data yang di submit file, gambar dan folder pada attacment
import multer from "multer"; // import multer

// menentukan dimana file yang di upload disimpan
let storage = multer.diskStorage({
  // tujuan file storage disimpan
  destination: function (req, file, cb) {
    // di folder public dalam folder img
    cb(null, "./public/img/"); // cb adalah callback untuk mengirim ke folder tujuan
  },
  // menentukan nama file yang di upload disimpan
  filename: function (req, file, cb) {
    // mendapatkan ekstensi nama file dengan (file.originalname)
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    // callback menambahkan timestamp saat ini file di upload untuk menghindari konfik nama file
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
});

// router barang untuk mendapatkan dan menampilkan barang
barangRouter
  .route("/")
  .get((req, res) => {
    res.send("ini method get semua barang");
  })
  .post((req, res) => {
    res.send("ini method post barang");
  });

// router untuk menampilkan barang yang di insert(dimasukkan) menggunakan method get
barangRouter.route("/insert").get((req, res) => {
  const data = {
    title: "Barang",
    layout: "layout/main-layout",
  };

  // merender folder barang didalam file form.ejs
  res.render("barang/form", data);
});

// router barang untuk mendapatkan, mengedit dan menghapus
barangRouter
  .route("/:id")
  .get((req, res) => {
    // membuat query id
    const stok = req.query.stok_barang;
    res.send(
      "ini method get barang dengan id = " +
        req.params.id +
        "<br>" +
        "stok barang = " +
        stok
    );
  })
  .put((req, res) => {
    res.send("ini method put barang dengan id = " + req.params.id);
  })
  .delete((req, res) => {
    res.send("ini method delete barang dengan id = " + req.params.id);
  });

export default barangRouter;
