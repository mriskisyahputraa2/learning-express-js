import express from "express";
const barangRouter = express.Router();

barangRouter
  .route("/")
  .get((req, res) => {
    res.send("ini method get semua barang");
  })
  .post((req, res) => {
    res.send("ini method post barang");
  });

barangRouter
  .route("/:id")
  .get((req, res) => {
    // membuat query id
    const stok = req.query.stok_barang;
    res.send(
      "ini method get barang dengan id = " +
        req.params.id +
        "<br>" +
        "stok barang = " +
        stok
    );
  })
  .put((req, res) => {
    res.send("ini method put barang dengan id = " + req.params.id);
  })
  .delete((req, res) => {
    res.send("ini method delete barang dengan id = " + req.params.id);
  });

export default barangRouter;
