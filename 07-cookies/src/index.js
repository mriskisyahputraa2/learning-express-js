// materi cookies
import express from "express";
import cookieParser from "cookie-parser"; // import cookieParser

const app = express();
const port = 3000;

// mendefinisikan cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("hallo");
  res.send("hallo");
});

app.get("/set-cookies", (req, res) => {
  res.send("Cookies are set");
});

app.get("/get-cookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("age");
});

app.listen(port, () => {
  console.log("port listening on port " + port);
});
