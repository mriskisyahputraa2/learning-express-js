// penggunaan Router-level middleware

import express from "express";

const app = express();
const port = 3000;
const router = express.Router();

// Router-level middleware untuk date time
router.use((req, res, next) => {
  console.log("Date Time: " + Date.now());
  next();
});

// menjalankan Router-level middleware
router.get("/", (req, res) => {
  res.send("Hello Router-level middleware");
});

// menjalankan dan menggunakan express router
app.use("/router", router);

app.listen(port, () => {
  console.log("port running on port" + port);
});
