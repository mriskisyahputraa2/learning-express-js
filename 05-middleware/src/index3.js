// penggunaan Error-handling middleware

import express from "express";

const app = express();
const port = 3000;

// membuat middleware error handler
app.get("/", (req, res, next) => {
  throw new Error("Ada sebuah error");
});

// menjalankan middleware error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("ada sebuah error");
});

app.listen(port, () => {
  console.log("port running on port " + port);
});
