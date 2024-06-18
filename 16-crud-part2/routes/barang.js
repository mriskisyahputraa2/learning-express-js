import express from "express";
import {
  editBarang,
  getAllBarang,
  insertBarang,
  setNewBarang,
  setEditBarang,
} from "../src/controllers/barang.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang); // route menampilkan halaman utama barang
barangRouter.get("/insert", insertBarang); // route menampilkan halaman add barang
barangRouter.post("/", setNewBarang); // route add barang ke database
barangRouter.get("/:id", editBarang); // route menampilkan edit barang
barangRouter.post("/:id", setEditBarang); // route edit barang

export default barangRouter;
