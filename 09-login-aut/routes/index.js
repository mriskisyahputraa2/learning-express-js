import express, { Router } from "express";
const routes = express.Router(); // definisi routes express router

let Users = []; // membuat array untuk menyimpan data dummy

// routes
routes.get("/", (req, res) => {
  res.send("Hello brayy");
});

routes.get("/singup", (req, res) => {
  const data = {
    title: "Sing Up",
    layout: "layout/main-layout",
    message: "",
  };
  res.render("singup", data);
});

export default routes;
