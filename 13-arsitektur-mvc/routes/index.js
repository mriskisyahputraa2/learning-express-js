import express, { Router } from "express";
import {
  getProtectedPage,
  getSignup,
  issLoggedIn,
  postSignup,
  useProtectedPage,
} from "../src/controllers/register.js";
import { getLogin, logout, postLogin } from "../src/controllers/login.js";
const routes = express.Router(); // definisi routes express router

// routes /
routes.get("/", (req, res) => {
  res.send("Hello brayy");
});

// route signup semua
// routes menampilkan halaman signup
routes.get("/signup", getSignup);
// routes mendapatkan validasi signup menggunakan async: untuk menyimpan data pengguna ke database
routes.post("/signup", postSignup);
// mengatur route get, untuk protected-page dengan middleware issLoggedIn sebagai middleware pertama
routes.get("/protected-page", issLoggedIn, getProtectedPage);

// route login & logout semua
// route get untuk views login
routes.get("/login", getLogin);
// routes post mendapatkan validasi login menggunakan async: untuk menyimpan data pengguna ke database
routes.post("/login", postLogin);
// route get logout
routes.get("/logout", logout);

// Middleware untuk Menangani Kesalahan pada Rute /protected-page, jika pengguna belum login
routes.use("/protected-page", useProtectedPage);
export default routes;

/* CATATAN

 # routes.use: digunakan untuk penggunaan middleware
 # Middleware adalah fungsi yang memiliki akses ke objek permintaan (req), objek respons (res), dan fungsi berikutnya dalam siklus permintaan/ respons (next).


*/
