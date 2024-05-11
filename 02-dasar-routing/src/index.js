import express from "express"; // import express
import router from "./routes/index.js";
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
// app.get("/ab(cd)?e", (req, res) => {
//   res.send("ab(cd)?e");
// });

// app
//   .route("/barangs")
//   .get((req, res) => {
//     res.send("ini method get semua barang");
//   })
//   .post((req, res) => {
//     res.send("ini method post barang");
//   });

// app
//   .route("/barangs/:id")
//   .get((req, res) => {
//     res.send("ini method get barang dengan id = " + req.params.id);
//   })
//   .put((req, res) => {
//     res.send("ini method put barang dengan id = " + req.params.id);
//   })
//   .delete((req, res) => {
//     res.send("ini method delete barang dengan id = " + req.params.id);
//   });

// app.all("/barangs", (req, res) => {
//   res.send("ini method all");
// });

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Route Handler

// Route Handler callback 1 function
// app.get(
//   "/example/b",
//   (req, res, next) => {
//     console.log("the response will be sent by the next function ...");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello from B!");
//   }
// );

// // route handler kombinasi function dan array
// const cb0 = (req, res, next) => {
//   console.log("callback 0");
//   next();
// };

// const cb1 = (req, res, next) => {
//   console.log("callback 1");
//   next();
// };

// const cb2 = (req, res, next) => {
//   console.log("callback 2");
//   next();
// };
// // ini route kombinasi function dan array nya
// app.get("/callback/c", [cb0, cb1, cb2]);

/*
 # Route Paths
    adalah sebuath combinasi yang meminta request method, mendefinisikan endpoint yang bisa di buat. Route path bisa berupa string, pola string atau expression

    characters ?, +, *, dan () adalah sebuah expressions. dan tanda (-) dan juga dot (.) adalah sebuah string

    jika menggunakan tanda dolar ($) dalam string, bungkus dalam ([string]) Sebagai contoh, string jalur untuk permintaan di “/data/$buku”, akan menjadi “/data/([\$])buku”.
 */
