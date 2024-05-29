import express, { Router } from "express";
const routes = express.Router(); // definisi routes express router

let Users = []; // array ini digunakan untuk menyimpan data pengguna

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

// routes validasi signup
routes.post("/signup", (req, res) => {
  // validasi, jika request body nama, email dan password belum ada
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400); // maka tampilkan status 400

    // message: adalah sebuah "key", ini yang akan digunakan jika ingin menggunakan sweet alert pesan kesalahan
    // "Error !", "Data tidak boleh kosong": Nilai dari pesan flash, adalah sebuah array yang berisi tiga elemen: tipe pesan ("error"), judul pesan ("Error !"), dan teks pesan ("Data tidak boleh kosong").
    req.flash("message", ["error", "Error !", "Data tidak boleh kosong"]);
    res.redirect("/signup"); // mengembalikan ke halaman signup

    // kalau tidak ada, memeriksa duplikasi email
  } else {
    // memeriksa setiap pengguna dalam array 'Users' untuk melihat apakah ada email yang sama dengan email yang inputkan oleh pengguna req.body.email
    Users.filter((user) => {
      // validasi, jika ditemukan email yang sama dengan email yang inputkan oleh pengguna lain, maka
      if (user.email === req.body.email) {
        res.status(400); // tampilkan status 400

        req.flash("message", ["error", "Error !", "Email already exists"]);
        res.redirect("/signup");
      }
    });

    // jika email tidak ditemukan duplikasinya, maka tambahkan pengguna baru
    const newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password,
    };

    Users.push(newUser); // menambahkan pengguna baru ke array 'Users'
    req.session.user = newUser; // menyimpan infomasi pengguna pengguna baru ke dalam session pengguna, untuk melacak informasi pengguna sekana masih dalam aplikasi
    res.redirect("/protected-page"); // mengalihkan pengguna ke halaman protected-page
  }

  // fungsi ini middleware untuk memeriksa apakah pengguna telah login atau belum, pesan error ada di bawah
  function issLoggedIn(req, res, next) {
    // validasi, Memeriksa apakah objek user ada di sesi (req.session.user). Ini berarti pengguna telah login.
    if (req.session.user) {
      next(); // Jika pengguna telah login, middleware melanjutkan ke middleware atau rute berikutnya.
    } else {
      let err = new Error("Anda belum login!"); //Jika pengguna belum login, buat objek kesalahan (Error) dengan pesan "Anda belum login!"
      next(err); // dan lanjutkan ke middleware berikutnya dengan melewatkan objek kesalahan tersebut (next(err)).
    }
  }

  // mengatur route get untuk protected-page dengan middleware issLoggedIn sebagai middleware pertama
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

  // route post untuk menangani login yang dilakukan oleh pengguna
  routes.post("/login", (req, res) => {
    // validasi, jika email atau password nya belum dimasukkan
    if (!req.body.email || !req.body.password) {
      res.status(400); // kembalikan status error 400

      req.flash("message", ["error", "Error !", "Data tidak boleh kosong!"]);
      res.redirect("/login");
      // kalo tidak, validasi email dan password ada
    } else {
      // validasi, cek jika data array pengguna di Users masih kosong atau belum melakukan signup
      if (Users.length === 0) {
        res.redirect("/signup"); // maka, bawa pengguna kehalaman signup

        // kalo pengguna sudah melakukan signup
      } else {
        // maka, melakukan filter pada array 'Users' untuk mencari user yang cocok dengan 'email' dan 'password' yang diberikan.
        Users.filter((user) => {
          // validasi, cek jika email dan password cocok
          if (
            user.email === req.body.email &&
            user.password === req.body.password
          ) {
            req.session.user = user; // simpan data ke dalam session
            res.redirect("/protected-page"); // dan bawa pengguna kehalaman protected-page(halaman utama)

            // kalo tidak ada atau tidak cocok
          } else {
            res.status(400); // tampilkan status error 400

            // data object untuk pesan kesalahan jika email dan password tidak cocok

            req.flash("message", [
              "error",
              "Error !",
              "Email tidak terdaftar!",
            ]);

            // merender login dan data objectnya
            res.redirect("login");
          }
        });
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

//masih ada kesalahan
export default routes;

/* CATATAN

 # routes.use: digunakan untuk penggunaan middleware
 # Middleware adalah fungsi yang memiliki akses ke objek permintaan (req), objek respons (res), dan fungsi berikutnya dalam siklus permintaan/ respons (next).


*/
