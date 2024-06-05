import express from "express";
import routes from "../routes/index.js"; // import routes dari routes/index.js

const app = express();
const port = 3000;

import bodyParser from "body-parser"; // Untuk mem-parsing badan request
import multer from "multer"; // Untuk menangani form data, khususnya file upload
import cookieParser from "cookie-parser"; // Untuk mem-parsing cookie
import session from "express-session"; // Untuk mengelola session
import expressEjsLayouts from "express-ejs-layouts"; // Untuk mengelola layout EJS
import flash from "express-flash"; // Untuk message kesalahan / error

import path from "path"; // Untuk mengelola path file dan direktori
import url from "url"; // Untuk mengelola URL
const upload = multer();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views")); // Mengatur direktori views ke dalam folder views.
app.set("view engine", "ejs"); // Mengatur EJS sebagai template engine.

app.use(expressEjsLayouts); // Mengaktifkan layout EJS.
app.use(express.static(path.join(__dirname, "../public"))); // Menyajikan file statis dari direktori public.

app.use(bodyParser.json()); // Mengaktifkan parsing JSON.
app.use(bodyParser.urlencoded({ extended: true })); // Mengaktifkan parsing URL-encoded data.
app.use(upload.array()); // Mengaktifkan upload file dengan Multer.
app.use(cookieParser()); //  Mengaktifkan parsing cookie.

// konfigurasi untuk middlaware session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false, //
  })
);

app.use(flash()); // menggunakan route middleware nya
app.use(routes); // menggunakan routes middleware nya

app.listen(port, () => {
  console.log("port is " + port);
});
