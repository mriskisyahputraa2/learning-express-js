import express from "express";

const app = express();
const port = 3000;

import bodyParser from "body-parser"; // Untuk mem-parsing badan request
import multer from "multer"; // Untuk menangani form data, khususnya file upload
import cookieParser from "cookie-parser"; // Untuk mem-parsing cookie
import session from "express-session"; // Untuk mengelola session
import expressEjsLayouts from "express-ejs-layouts"; // Untuk mengelola layout EJS

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

// konfigurasi middlaware session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false, //
  })
);

app.listen(port, () => {
  console.log("port is " + port);
});

/*
secret: "secret key":

secret adalah string yang digunakan untuk menandatangani dan mengenkripsi ID sesi di cookie. Ini adalah kunci keamanan yang penting dan harus disimpan dengan aman.
"secret key" dalam contoh ini adalah placeholder; dalam aplikasi nyata, ini harus berupa string yang kompleks dan sulit ditebak.
resave: false:

resave menentukan apakah sesi harus disimpan kembali ke store sesi, bahkan jika sesi tidak dimodifikasi selama request.
Jika false, sesi hanya akan disimpan jika sesi tersebut telah dimodifikasi. Ini dapat mengurangi beban kerja pada store sesi.
saveUninitialized: false:

saveUninitialized menentukan apakah sesi yang baru, tetapi belum dimodifikasi, harus disimpan ke store sesi.
Jika false, sesi yang baru dibuat tidak akan disimpan sampai sesi tersebut benar-benar diubah. Ini berguna untuk mematuhi hukum privasi seperti GDPR yang mewajibkan persetujuan pengguna sebelum menyimpan data yang dapat diidentifikasi.

*/
