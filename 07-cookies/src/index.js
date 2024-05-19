// materi cookies
import express from "express";
import cookieParser from "cookie-parser"; // import cookieParser

const app = express();
const port = 3000;

// mendefinisikan cookie parser, untuk mengatur cookie
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("hallo");
  res.send("hallo");
});

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "name=riski syahputra"); // mengatur cookie dengan manual

  // menggunakan fungsi cookie dengan npm
  // name: adalah cookie yang diatur
  // riski: adalah nilai cookie yang diatur
  res.cookie("name", "riski syahputra", {
    // maxAge dan expires adalah object untuk menyetel hidup cookie dan kedaluwarsa cookie
    // maxAge: 5000, // 5000(5 detik)
    // expires: new Date(Date.now() + 5000), // waktu(time) sekarang mati setelah 5 detik
    httpOnly: true,
    secure: true,
    domain: "localhost",
  });
  res.send("Cookies are set");
});

app.get("/get-cookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("name"); //menghapus cookie dari cookie name diatas
  res.send("Cookie dihapus");
});

app.listen(port, () => {
  console.log("port listening on port " + port);
});
