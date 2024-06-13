import barangCollection from "../models/barang.js";

const getAllBarang = async (req, res, next) => {
  try {
    const barang = await barangCollection.find({});
    const data = {
      title: "Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: barang,
    };
    res.render("barang/index", data);
  } catch (err) {
    next(err);
  }
};

export { getAllBarang };
