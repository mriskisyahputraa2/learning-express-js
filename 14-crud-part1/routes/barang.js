import express from "express";
import { getAllBarang } from "../src/controllers/barang.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang);

export default barangRouter;
