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

  // mengatur route get untuk protected-page
  routes.get("/protected-page", (req, res) => {
    // data object informasi untuk views protected-page
    const data = {
      title: "Protected Page",
      layout: "layout/main-layout",
      user: "Welcome" + req.session.user.nama,
    };

    res.render("protected-page", data);
  });
});

export default routes;
