// penggunaan middleware yang umumnya

import express from "express";

const app = express();
const port = 3000;

// middlaware untuk mencetak log
app.use((req, res, next) => {
  console.log("Halo brayy");
  next();
});

// middlaware untuk menampilkan waktu pemintaan
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

// menampilkan middlaware ke browser
app.get("/", (req, res) => {
  let responText = "Hello Middleware <br>";
  responText += `Waktu permintaan: ${req.requestTime}`;
  res.send(responText);
});

app.listen(port, () => {
  console.log("locahost running on port" + port);
});
