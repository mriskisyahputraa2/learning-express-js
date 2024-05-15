import express from "express";
const router = express.Router();
import barangRouter from "./barang.js";

router.use("/", (req, res) => {
  const data = {
    title: "Halaman Barang",
    layout: "layout/main-layout",
    data: [
      {
        id: 100,
        nama: "Baju",
      },
      {
        id: 200,
        nama: "Celana",
      },
      {
        id: 300,
        nama: "sepatu",
      },
    ],
  };

  res.render("index", data);
});

router.use("/barangs", barangRouter);

router.all("/barangs", (req, res) => {
  res.send("all methods barang");
});

router.use("*", (req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

export default router;
