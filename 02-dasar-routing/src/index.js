import express from "express"; // import express
import url from "url"; // import url untuk __dirname

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// route paths

// route ini cocok dengan request random text
// app.get("/random.text", (req, res) => {
//   res.send("ini metode random text");
// });

// route ini cocok dengan acd dan abcd
// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd");
// });

// route ini cocok digunakan dengan abcd, abbbcd, dan seterusnya b sepanjang panjangnya pun bisa
// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });

// route ini cocok digunakan dengan route random yang penting ada abcd, contoh ab(bfjdu)cd yang penting ada abcd nya
// app.get("/ab*cd", (req, res) => {
//   res.send("ab*cd");
// });

//route ini akan cocok dengan /abe dan /abcde.
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
 # Route Paths
    adalah sebuath combinasi yang meminta request method, mendefinisikan endpoint yang bisa di buat. Route path bisa berupa string, pola string atau expression

    characters ?, +, *, dan () adalah sebuah expressions. dan tanda (-) dan juga dot (.) adalah sebuah string

    jika menggunakan tanda dolar ($) dalam string, bungkus dalam ([string]) Sebagai contoh, string jalur untuk permintaan di “/data/$buku”, akan menjadi “/data/([\$])buku”.
 */
