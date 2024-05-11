import express from "express"; // import express
import url from "url"; // import url untuk __dirname

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/barangs", (req, res) => {
  res.send("ini method get barang");
});

app.post("/barangs", (req, res) => {
  res.send("ini method post barang");
});

app.put("/barangs", (req, res) => {
  res.send("ini method put barang");
});

app.delete("/barangs", (req, res) => {
  res.send("ini method delete barang");
});

// ini mencakup semua method routing
app.all("/barangs", (req, res) => {
  res.send("ini method all barang");
});

// menjalankan port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
 1. Membuat route url
 2. Membuat route url notfound, untuk route ini diharuskan ditaruh paling bawah  dari semua route yang ada
 */
