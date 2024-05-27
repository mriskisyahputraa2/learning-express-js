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
    message: "",
  };
  res.render("signup", data);
});

// routes signup
routes.post("/signup", (req, res) => {
  // validasi, jika request body nama, email dan password belum ada
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400); // maka tampilkan status 400

    // data object informasi untuk views signup
    const data = {
      title: "Sign Up",
      layout: "layout/main-layout",
      message: "Invalid data",
    };

    // akan merender halaman signup dengan pesan kesalahan "invalid data"
    res.render("signup", data);

    // kalau tidak ada, memeriksa duplikasi email
  } else {
    // memeriksa setiap pengguna dalam array 'Users' untuk melihat apakah ada email yang sama dengan email yang inputkan oleh pengguna req.body.email
    Users.filter((user) => {
      // validasi, jika ditemukan email yang sama dengan email yang inputkan oleh pengguna lain, maka
      if (user.email === req.body.email) {
        res.status(400); // tampilkan status 400

        // data object informasi untuk views signup
        const data = {
          title: "Sign Up",
          layout: "layout/main-layout",
          message: "Email already exists",
        };

        // akan merender halaman signup dengan pesan "Email sudah ada"
        res.render("signup", data);
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

  // mengatur route get untuk protected-page
  routes.get("/protected-page", (req, res, next) => {
    // data object informasi untuk views protected-page
    const data = {
      title: "Protected Page",
      layout: "layout/main-layout",
      message: "Welcome " + req.session.user.nama,
    };

    // akan merender halaman protected-page untuk pengguna baru dengan pesan "Welcome + nama pengguna"
    res.render("protected-page", data);
  });

  routes.get("/login", (req, res) => {
    const data = {
      title: "Login",
      layout: "layout/main-layout",
      message: "",
    };
    res.render("login", data);
  });

  // Middleware untuk Menangani Kesalahan pada Rute /protected-page, jika pengguna belum login
  routes.use("/protected-page", (err, req, res, next) => {
    // data object informasi untuk render ke halaman login
    let data = {
      title: "Halaman Login",
      layout: "layout/main-layout",
      message: err.message,
    };

    // merender halaman login dengan data object informasi yang sudah disiapkan
    res.render("login", data);
  });
});

// menit 32.29

export default routes;

/* CATATAN

 # routes.use: digunakan untuk penggunaan middleware
 # Middleware adalah fungsi yang memiliki akses ke objek permintaan (req), objek respons (res), dan fungsi berikutnya dalam siklus permintaan/ respons (next).


*/
