/*
// Penggunaan middleware bawaan,
    Express JS menyediakan beberapa middleware bawaan yang dapat digunakana
    tanpa perlu menginstal modul tambahan
*/

import express from "express";

const app = express();
const port = 3000;

// digunakan ketika ada file statis seperti html, css, js, dan img yang berada dalam folder public
app.use(express.static("public"));

// digunakan ketika ada request dalam bentuk json
app.use(express.json());

// digunakan ketika menggunakan submit form yang data lebih kompleks bisa diurai
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("port running on port " + port);
});
