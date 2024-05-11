import express from "express"; // import express
import url from "url"; // import url untuk __dirname

const app = express();
const port = 3000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// membuat route url
app.get("/", (req, res) => {
  // res.send("Hello World");
  // menampilkan json
  //   res.json({
  //     nama: "Rizki",
  //     umur: "18 tahun",
  //   });
  console.log(__dirname);
  res.sendFile("./page/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./page/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./page/contact.html", { root: __dirname });
});

// membuat route request params dan query berdasarkan id route
app.get("/barang/:id/kategori/:nama", (req, res) => {
  console.log(req.params.id);
  console.log(req.params.nama);

  // route menggunakan params id
  const id = req.params.id;
  const nama = req.params.nama;
  // route menggunakan query id
  const stok = req.query.stok_barang;
  res.send(
    "ini halaman barang dengan id: " +
      id +
      "<br>" +
      "kategori barang: " +
      nama +
      "<br>" +
      "stok barang:" +
      stok
  );
});

// membuat route url jika notfound
app.use("*", (req, res) => {
  res.status(404);
  //   res.send("halaman tidak ditemukan");
  res.sendFile("./page/404.html", { root: __dirname });
});

// menjalankan port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
 1. Membuat route url
 2. Membuat route url notfound, untuk route ini diharuskan ditaruh paling bawah  dari semua route yang ada
 */
