// function untuk melakukan pencarian dan penyaringan elemen daftar  berdasarkan input pengguna.
function myFunction() {
  // mendefinisikan dan mengambil elemen id
  let input, filter, ul, li, a, i;
  input = document.getElementById("mySearch"); // mengambil elemen input id mySearch
  filter = input.value.toUpperCase(); // Mengambil nilai dari input dan mengubahnya menjadi huruf kapital untuk memudahkan pencarian
  ul = document.getElementById("myMenu"); // mengambil element ul dengan id myMenu
  li = ul.getElementsByTagName("li"); // mengambil semua element li yang ada didalam ul

  // looping untuk memeriksa setiap item yang terdaftar di li
  for (i = 0; i < li.length; i++) {
    // Mengambil elemen (a) pertama dalam setiap elemen li.
    a = li[i].getElementsByTagName("a")[0];
    // Mengecek apakah teks dalam elemen (a) mengandung string yang sama dan huruf kapital dengan filter.
    if (a.innerText.toUpperCase().indexOf(filter) > -1) {
      // jika ya, maka tampilkan elemen li jika teks dalam elemen (a) cocok dengan filter.
      li[i].style.display = "";
    } else {
      // jika tidak, sembunyikan elemen li jika teks dalam elemen (a) tidak cocok dengan filter.
      li[i].style.display = "none";
    }
  }
}

// event listener untuk input pencarian
let search = document.getElementById("mySearch"); // mengambil elemen input dengan id "mySearch"
search.addEventListener("keyup", myFunction); // Menambahkan event listener "keyup" (ketika tombol dilepaskan setelah ditekan) dan memanggil fungsi myFunction untuk melakukan pencarian saat pengguna mengetik.

// function edit untuk menangani mode edit dan hapus pada form
function edit(mode) {
  //validasi, Mengecek apakah mode yang diteruskan adalah "update".
  if (mode == "update") {
    // jika ya,
    document.getElementById("mode").value = "update"; // Mengubah nilai elemen dengan ID "mode" menjadi "update".
    document.getElementById("form").submit(); // Mengirimkan form dengan ID "form".

    // jika mode bukan update
  } else {
    // Memanggil SweetAlert untuk menampilkan dialog konfirmasi dengan opsi "Ya" dan "Tidak".
    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Yakin akan dihapus?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    }).then((result) => {
      // jika pengguna mengklik "Ya"
      if (result.isConfirmed) {
        document.getElementById("mode").value = "delete"; // Mengubah nilai elemen dengan ID "mode" menjadi "delete".
        document.getElementById("form").submit(); // Mengirimkan form dengan ID "form".

        // jika pengguna mengklik "Tidak"
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //  maka tidak melakukan apa-apa hanya mengembalikan nilai false
        return false;
      }
    });
  }
}
