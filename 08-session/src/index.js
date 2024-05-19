import exprees from "express";
import bodyParser from "body-parser";
import session from "express-session"; // import session

const app = exprees();
const port = 3000;

// konfigurasi body parser json, body parser urlencode, dan session
app.use(bodyParser.json()); // mendefinisikan body parser(menguraikan) untuk data JSON
app.use(bodyParser.urlencoded({ extended: true })); // mendefinisikan urlencoded data URL-encoded yang dikirim untuk permintaan HTTP dan extended true, untuk penguraikan data yang lebih kompleks
app.use(
  session({
    secret: "secret", // menandatangi id session cookie agar memesatikan bahwa session tidak dapat dipalsukan
    resave: false, // menentukan apakah session harus disimpan kedalam penyimpanan sessioin, karna (false) maka tidak disimpan
    saveUninitialized: true, // menentukan apakah session yang baru, tetapi belum dimodifikasi, harus disimpan kepenyimpanan session atau tidak, karna (true) maka session yang belum dimodifikasi akan disimpan
    // konfigurasi cookie
    cookie: {
      secure: true, // menentukan apakah cookie sesi hanya dikirim melalui koneksi HTTPS. karna (true) cookie yang dikirim melaui HTTPS akan diaktifkan keamanannya dengan memastikan cookie tidak dikirim melalui koneksi yang tidak aman.
      httpOnly: true, // menentukan apakah cookie session hanya dapat diakses oleh server atau tidak, karna (true) cookie  tidak dapat diakses melalui JavaScript (misalnya, document.cookie), yang mencegah serangan XSS (Cross-Site Scripting).
      maxAge: 60000, // menetukan cookie hilang dalam 6 menit
    },
  })
);

app.get("/login", (req, res) => {
  console.log(req.sessionID); // mencetak session ID nya
  const { username, password } = req.body; // mengambil username dan password dari data req.body

  // jika username dan password ada atau terpenuhi
  if (username && password) {
    // jika terpenuhi, maka cek apakah session username sudah terautentikasi
    if (req.session.authenticated) {
      // jika ya, maka informasi dikirimkan sebagai respons dalam format json
      res.json(req.session);

      // jika tidak ada, maka periksa password
    } else {
      // cek apakah password yang diberikan adalah "1234"
      if (password === "1234") {
        // jika password sesuai "1234" pengguna diatur sebagai terautentikasi dan informasi pengguna disimpan dalam sesi.
        req.session.authenticated = true; // Menandai bahwa sesi pengguna telah terautentikasi.

        // Menyimpan informasi pengguna dalam sesi.
        req.session.user = {
          username,
          password,
        };
        res.json(req.session); // Mengirim informasi sesi sebagai respons dalam format JSON.

        // jika password nya tidak sama dengan "1234"
      } else {
        // tambahkan status 403 berupa json
        res.status(403).json({
          // dengan pesan "Bad Credentials"
          msg: "Bad Credentials",
        });
      }
    }
    // jika tidak ada username dan password
  } else {
    // tambahkan status 403 berupa json
    res.status(403).json({
      // dengan pesan "Bad Credentials"
      msg: "Bad Credentials",
    });
  }
});

app.listen(port, () => {
  console.log("port is running in localhost " + port);
});

/*
 # app.use(bodyParser.urlencoded({ extended: true }));
    - bodyParser.urlencoded() adalah middleware dari paket body-parser.
    - Ini mengkonfigurasi aplikasi Express untuk menguraikan data URL-encoded yang dikirim dalam tubuh permintaan HTTP.
    - Data URL-encoded adalah data yang dikirim dari formulir HTML menggunakan metode POST.
 
 # { extended: true }
    - extended: true: Ketika disetel ke true, ini memungkinkan untuk menguraikan data URL-encoded menggunakan library qs, yang mendukung nested objects (objek bersarang). Ini memungkinkan penguraian data yang lebih kompleks.
    - extended: false: Ketika disetel ke false, data URL-encoded akan diuraikan menggunakan library querystring, yang tidak mendukung nested objects dan hanya dapat menangani data yang lebih sederhana.  

 # Kesimpulan dalam konfigurasi session
    - Keamanan: Menggunakan secret untuk menandatangani cookie sesi, secure untuk memastikan cookie hanya dikirim melalui HTTPS, dan httpOnly untuk mencegah akses cookie melalui JavaScript di browser.
    - Efisiensi: resave: false untuk menghindari penulisan kembali sesi yang tidak berubah, dan saveUninitialized: true untuk melacak sesi yang baru tetapi belum dimodifikasi.
    - Pengaturan Cookie: maxAge untuk mengatur waktu kedaluwarsa cookie.
*/
