import express, { Router } from "express";
import logInCollection from "../src/models/users.js";
import e from "express";
import { encript } from "../src/utils/bcrypt.js";
import { compare } from "bcrypt";
import regValid from "../src/validation/register.js";
const routes = express.Router(); // definisi routes express router

// routes
routes.get("/", (req, res) => {
  res.send("Hello brayy");
});

// routes menampilkan halaman signup
routes.get("/signup", (req, res) => {
  // data object informasi untuk signup
  const data = {
    title: "Sing Up",
    layout: "layout/main-layout",
    message: req.flash("message"),
  };
  res.render("signup", data);
});

// routes mendapatkan validasi signup menggunakan async: untuk menyimpan data pengguna ke database
routes.post("/signup", async (req, res) => {
  const hasil = await regValid(req.body);

  if (hasil.message.length > 0) {
    res.status(400); // status 400(error)

    // message: adalah sebuah "key", ini yang akan digunakan jika ingin menggunakan sweet alert pesan kesalahan
    // "Error !", "Data tidak boleh kosong": Nilai dari pesan flash, adalah sebuah array yang berisi tiga elemen: tipe pesan ("error"), judul pesan ("Error !"), dan teks pesan ("Data tidak boleh kosong").
    req.flash("message", ["error", "Error !", hasil.message[0]]);
    res.redirect("/signup"); // mengembalikan ke halaman signup

    // kalau data nama, email dan password ada
  } else {
    // periksa apakah email sudah terdaftar
    const checking = await logInCollection.findOne({ email: hasil.data.email });

    //validasi, cek apakah email sudah terdaftar? sudah
    if (checking) {
      res.status(400); // tampilkan status 400

      // tampilkan message "Email sudah ada!"
      req.flash("message", ["error", "Error !", "Email sudah ada!"]);
      res.redirect("/signup"); // kembalikan user ke halaman signup

      // kalo email nya belum terdaftar
    } else {
      // jika email belum terdaftar, buat user baru dengan nama, email dan password
      const newUser = {
        nama: hasil.data.nama,
        email: hasil.data.email,
        password: await encript(hasil.data.password), // dan buat password menjadi encript yaitu password acak
      };

      // simpan user ke dalam database
      await logInCollection.insertMany([newUser]);

      // simpan informasi nama dan password ke session agar bisa nanti di loginkan
      req.session.user = {
        nama: newUser.nama,
        password: newUser.password,
      };
      res.redirect("/protected-page"); // mengalihkan pengguna ke halaman protected-page
    }
  }

  // fungsi ini middleware untuk memeriksa apakah pengguna telah login atau belum, pesan error ada di bawah
  function issLoggedIn(req, res, next) {
    // validasi, periksa apakah user sudah login dengan melihat apakah ada user di session
    if (req.session.user) {
      next(); // Jika pengguna telah login, middleware melanjutkan ke middleware atau rute berikutnya.
    } else {
      let err = new Error("Anda belum login!"); //Jika pengguna belum login, buat objek kesalahan (Error) dengan pesan "Anda belum login!"
      next(err); // dan lanjutkan ke middleware berikutnya dengan melewatkan objek kesalahan tersebut (next(err)).
    }
  }

  // mengatur route get, untuk protected-page dengan middleware issLoggedIn sebagai middleware pertama
  routes.get("/protected-page", issLoggedIn, (req, res, next) => {
    // data object informasi untuk views protected-page
    const data = {
      title: "Protected Page",
      layout: "layout/main-layout",
      message: "Welcome " + req.session.user.nama,
    };

    // akan merender halaman protected-page untuk pengguna baru dengan pesan "Welcome + nama pengguna"
    res.render("protected-page", data);
  });

  // route get untuk views login
  routes.get("/login", (req, res) => {
    // data object informasi untuk views login
    const data = {
      title: "Login",
      layout: "layout/main-layout",
      message: req.flash("message"),
    };
    // render halaman login dengan informasi dari object data
    res.render("login", data);
  });

  // routes post mendapatkan validasi login menggunakan async: untuk menyimpan data pengguna ke database
  routes.post("/login", async (req, res) => {
    // validasi, cek apakah email atau password sudah ada atau belum? belum
    if (!req.body.email || !req.body.password) {
      res.status(400); // kirim status 400(error)

      // tampilkan pesan error "data tidak boleh kosong"
      req.flash("message", ["error", "Error !", "Data tidak boleh kosong!"]);
      res.redirect("/login"); // kembalikan user kehalaman login

      // kalo data email atau password sudah ada
    } else {
      // cari apakah email ada di database
      const checking = await logInCollection.findOne({ email: req.body.email });

      // validasi, cek jika email ada di database
      if (checking) {
        // validasi, apakah password yang dimasukkan oleh pengguna sesuai dengan yang disimpan dalam database sama, menggunakan fungsi compare
        if (await compare(req.body.password, checking.password)) {
          // Jika cocok, simpan informasi user ke session dan redirect ke halaman protected
          req.session.user = {
            nama: checking.nama,
            email: checking.email,
          };
          res.redirect("/protected-page"); // bawa user kehalaman protected

          // kalo password tidak cocok
        } else {
          res.status(400); // kirim status 400(error)
          req.flash("message", ["error", "Error !", "Password anda salah!"]); // dan pesan kesalahan "Password ada salah!"
          res.redirect("/login"); // bawa user ke halaman login, untuk login dulu
        }

        // kalo email tidak cocok
      } else {
        res.status(400); // kirim status 400(error)
        req.flash("message", ["error", "Error !", "Email tidak terdaftar!"]); // dan pesan kesalahan "Email tidak terdaftar!"
        res.redirect("/login"); // bawa user ke halaman login, untuk login dulu
      }
    }
  });

  // route get logout
  routes.get("/logout", (req, res) => {
    req.session.destroy(); // menghapus session dari login
    res.redirect("/login"); // kembali kehalaman login
  });

  // Middleware untuk Menangani Kesalahan pada Rute /protected-page, jika pengguna belum login
  routes.use("/protected-page", (err, req, res, next) => {
    req.flash("message", ["error", "Error !", err.message]); // err.message ny adalah 'Anda belum login', ini didapatkan dari middleware fungsi issLoggedIn
    res.redirect("/login");
  });
});

export default routes;

/* CATATAN

 # routes.use: digunakan untuk penggunaan middleware
 # Middleware adalah fungsi yang memiliki akses ke objek permintaan (req), objek respons (res), dan fungsi berikutnya dalam siklus permintaan/ respons (next).


*/
