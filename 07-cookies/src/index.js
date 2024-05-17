// materi cookies

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("hallo");
  res.send("hallo");
});

app.listen(port, () => {
  console.log("port listening on port" + port);
});
