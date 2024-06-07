import express from "express";

const appMiddleware = express();
import bodyParser from "body-parser"; // Untuk mem-parsing badan request
import multer from "multer"; // Untuk menangani form data, khususnya file upload
import cookieParser from "cookie-parser"; // Untuk mem-parsing cookie
import session from "express-session"; // Untuk mengelola session
import expressEjsLayouts from "express-ejs-layouts"; // Untuk mengelola layout EJS
import flash from "express-flash"; // Untuk message kesalahan / error
const upload = multer();

import path from "path"; // Untuk mengelola path file dan direktori
import url from "url"; // Untuk mengelola URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

import logProcess from "../logs/log.js";

appMiddleware.use(expressEjsLayouts); // Mengaktifkan layout EJS.
appMiddleware.use(express.static(path.join(__dirname, "../../public"))); // Menyajikan file statis dari direktori public.
appMiddleware.use(bodyParser.json()); // Mengaktifkan parsing JSON.
appMiddleware.use(bodyParser.urlencoded({ extended: true })); // Mengaktifkan parsing URL-encoded data.
appMiddleware.use(upload.array()); // Mengaktifkan upload file dengan Multer.
appMiddleware.use(cookieParser()); //  Mengaktifkan parsing cookie.

// konfigurasi untuk middlaware session
appMiddleware.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false, //
  })
);

appMiddleware.use(flash()); // menggunakan route middleware nya
appMiddleware.use(logProcess);

export default appMiddleware;
