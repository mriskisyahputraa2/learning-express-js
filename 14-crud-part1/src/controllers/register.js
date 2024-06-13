import regValid from "../validation/register.js";
import { compare, encript } from "../utils/bcrypt.js";
import logInCollection from "../models/users.js";

// mengambil/menampilkan tampilan signup
const getSignup = (req, res) => {
  // data object informasi untuk signup
  const data = {
    title: "Sing Up",
    layout: "layout/main-layout",
    message: req.flash("message"), // mengambil key message
    data: req.flash("data")[0], // mengambil key data dari indeks ke 0 yaitu mengambil object, jika tidak menggunakan 0 maka data nya bersifat array object
  };
  // console.log(data);
  res.render("signup", data);
};

// mendapatkan data signup
const postSignup = async (req, res) => {
  const hasil = await regValid(req.body); // validasi register message error dan membersihkan data register

  // validasi, jika terdapat pesan kesalahan yang terjadi pada register ketika melakukan register, maka
  if (hasil.message.length > 0) {
    res.status(400); // status 400(error)

    // message: adalah sebuah "key", ini yang akan digunakan jika ingin menggunakan sweet alert pesan kesalahan
    // "Error !", "Data tidak boleh kosong": Nilai dari pesan flash, adalah sebuah array yang berisi tiga elemen: tipe pesan ("error"), judul pesan ("Error !"), dan teks pesan ("Data tidak boleh kosong").
    req.flash("message", ["error", "Error !", hasil.message[0]]);
    req.flash("data", hasil.data);
    res.redirect("/signup"); // mengembalikan ke halaman signup

    // kalau data nama, email dan password ada
  } else {
    // periksa apakah email sudah terdaftar
    const checking = await logInCollection.findOne({ email: hasil.data.email });

    //validasi, cek apakah email sudah terdaftar? sudah
    if (checking) {
      res.status(400); // tampilkan status 400

      // tampilkan message "Email sudah ada!"
      req.flash("message", ["error", "Error !", "Email sudah ada!"]);
      req.flash("data", hasil.data);
      res.redirect("/signup"); // kembalikan user ke halaman signup

      // kalo email nya belum terdaftar
    } else {
      // jika email belum terdaftar, buat user baru dengan nama, email dan password
      const newUser = {
        nama: hasil.data.nama,
        email: hasil.data.email,
        password: await encript(hasil.data.password), // dan buat password menjadi encript yaitu password acak
      };

      // simpan user ke dalam database
      await logInCollection.insertMany([newUser]);

      // simpan informasi nama dan password ke session agar bisa nanti di loginkan
      req.session.user = {
        nama: newUser.nama,
        password: newUser.password,
      };
      res.redirect("/protected-page"); // mengalihkan pengguna ke halaman protected-page
    }
  }

  // fungsi ini middleware untuk memeriksa apakah pengguna telah login atau belum, pesan error ada di bawah
  function issLoggedIn(req, res, next) {
    // validasi, periksa apakah user sudah login dengan melihat apakah ada user di session
    if (req.session.user) {
      next(); // Jika pengguna telah login, middleware melanjutkan ke middleware atau rute berikutnya.
    } else {
      let err = new Error("Anda belum login!"); //Jika pengguna belum login, buat objek kesalahan (Error) dengan pesan "Anda belum login!"
      next(err); // dan lanjutkan ke middleware berikutnya dengan melewatkan objek kesalahan tersebut (next(err)).
    }
  }
};

// mengambil/menampilkan tampilan protected-page/utama
const getProtectedPage = (req, res, next) => {
  // data object informasi untuk views protected-page
  const data = {
    title: "Protected Page",
    layout: "layout/main-layout",
    message: "Welcome " + req.session.user.nama,
  };

  // akan merender halaman protected-page untuk pengguna baru dengan pesan "Welcome + nama pengguna"
  res.render("protected-page", data);
};

// fungsi ini middleware untuk memeriksa apakah pengguna telah login atau belum, pesan error ada di bawah
function issLoggedIn(req, res, next) {
  // validasi, periksa apakah user sudah login dengan melihat apakah ada user di session
  if (req.session.user) {
    next(); // Jika pengguna telah login, middleware melanjutkan ke middleware atau rute berikutnya.
  } else {
    let err = new Error("Anda belum login!"); //Jika pengguna belum login, buat objek kesalahan (Error) dengan pesan "Anda belum login!"
    next(err); // dan lanjutkan ke middleware berikutnya dengan melewatkan objek kesalahan tersebut (next(err)).
  }
}

// Middleware untuk Menangani Kesalahan pada Rute /protected-page, jika pengguna belum login
const useProtectedPage = (err, req, res, next) => {
  req.flash("message", ["error", "Error !", err.message]); // err.message ny adalah 'Anda belum login', ini didapatkan dari middleware fungsi issLoggedIn
  res.redirect("/login");
};

export {
  getSignup,
  postSignup,
  getProtectedPage,
  issLoggedIn,
  useProtectedPage,
};
