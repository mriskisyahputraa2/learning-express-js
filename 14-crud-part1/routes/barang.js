import express from "express";
import {
  getAllBarang,
  insertBarang,
  setNewBarang,
} from "../src/controllers/barang.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang); // route menampilkan halaman utama barang
barangRouter.get("/insert", insertBarang); // route menampilkan halaman add barang
barangRouter.post("/", setNewBarang); // route add barang ke database

export default barangRouter;
