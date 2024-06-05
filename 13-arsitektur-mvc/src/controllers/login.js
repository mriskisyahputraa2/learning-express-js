import logInCollection from "../models/users.js";
import loginValid from "../validation/login.js";
import { compare, encript } from "../utils/bcrypt.js";

// mengambil/menampilkan tampilan login
const getLogin = (req, res) => {
  // data object informasi untuk views login
  const data = {
    title: "Login",
    layout: "layout/main-layout",
    message: req.flash("message"),
    data: req.flash("data")[0],
  };
  // render halaman login dengan informasi dari object data
  res.render("login", data);
};

// routes post mendapatkan validasi login menggunakan async: untuk menyimpan data pengguna ke database
const postLogin = async (req, res) => {
  const hasil = await loginValid(req.body);

  // validasi, cek apakah email atau password sudah ada atau belum? belum
  if (hasil.message.length > 0) {
    res.status(400); // kirim status 400(error)

    // tampilkan pesan error "data tidak boleh kosong"
    req.flash("message", ["error", "Error !", hasil.message[0]]);
    req.flash("data", hasil.data);
    res.redirect("/login"); // kembalikan user kehalaman login

    // kalo data email atau password sudah ada
  } else {
    // cari apakah email ada di database
    const checking = await logInCollection.findOne({
      email: hasil.data.email,
    });

    // validasi, cek jika email ada di database
    if (checking) {
      // validasi, apakah password yang dimasukkan oleh pengguna sesuai dengan yang disimpan dalam database sama, menggunakan fungsi compare
      if (await compare(hasil.data.password, checking.password)) {
        // Jika cocok, simpan informasi user ke session dan redirect ke halaman protected
        req.session.user = {
          nama: checking.nama,
          email: checking.email,
        };
        res.redirect("/protected-page"); // bawa user kehalaman protected

        // kalo password tidak cocok
      } else {
        res.status(400); // kirim status 400(error)
        req.flash("message", ["error", "Error !", "Password anda salah!"]); // dan pesan kesalahan "Password ada salah!"
        req.flash("data", hasil.data);
        res.redirect("/login"); // bawa user ke halaman login, untuk login dulu
      }

      // kalo email tidak cocok
    } else {
      res.status(400); // kirim status 400(error)
      req.flash("message", ["error", "Error !", "Email tidak terdaftar!"]); // dan pesan kesalahan "Email tidak terdaftar!"
      req.flash("data", hasil.data);
      res.redirect("/login"); // bawa user ke halaman login, untuk login dulu
    }
  }
};

const logout = (req, res) => {
  req.session.destroy(); // menghapus session dari login
  res.redirect("/login"); // kembali kehalaman login
};

export { getLogin, postLogin, logout };
