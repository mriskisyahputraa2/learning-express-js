import express from "express";
const router = express.Router();
import barangRouter from "./barang.js";

router.use("/", (req, res) => {
  res.render("index");
});

router.use("/barangs", barangRouter);

// router.all("/barangs", (req, res) => {
//   res.send("all methods barang");
// });
router.use("*", (req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

export default router;
