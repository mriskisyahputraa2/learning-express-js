import express, { Router } from "express";
const routes = express.Router(); // definisi routes express router

let Users = []; // membuat array untuk menyimpan data dummy

// routes
routes.get("/", (req, res) => {
  res.send("Hello brayy");
});

// routes menampilkan halaman signup
routes.get("/signup", (req, res) => {
  const data = {
    title: "Sing Up",
    layout: "layout/main-layout",
    message: "",
  };
  res.render("signup", data);
});

// ini belum ada penjelasan kode
routes.post("/signup", (req, res) => {
  //  jika permintaan request data tidak ada diisi yaitu berupa nama, email dan password
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400); // maka tampilkan pesan error 400
    const data = {
      title: "Sign Up",
      layout: "layout/main-layout",
      message: "Invalid data",
    };
    res.render("signup", data);
  } else {
    Users.filter((user) => {
      if (user.email === req.body.email) {
        res.status(400);
        const data = {
          title: "Sign Up",
          layout: "layout/main-layout",
          message: "Email already exists",
        };
        res.render("signup", data);
      }
    });
  }
});

export default routes;
