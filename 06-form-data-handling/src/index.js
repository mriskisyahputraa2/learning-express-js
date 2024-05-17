import express from "express"; // import express
const app = express();
const port = 3000;

import router from "./routes/index.js"; // import router

import expressEjsLayouts from "express-ejs-layouts"; // import expressEjsLayouts
import path from "path"; // import path
import url from "url"; // import url
const __dirname = url.fileURLToPath(new URL(".", import.meta.url)); // deklarasi __dirname

import bodyParser from "body-parser"; // import bodyParser
app.use(bodyParser.json()); // menguraikan request body yang berformat json
app.use(bodyParser.urlencoded({ extended: true })); // untuk menguraikan request body yang berformat multipart/form-data
// meng-set path dari views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

// digunakan untuk mengakses folder public yang tesimpan semua assets
app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* CATATAN

# Body Parser (npm install )
  adalah middleware npm untuk menguraikan(parse) dari request HTTP yang masuk.
  Middleware ini sangat berguna ketika ingin mengakases data yang dikirim melalui
  metode POST, PUT, atau PACTH, seperti data dari formulir HTML atau JSON.
  ada 4 kegunaan body parser
  1. Menguraikan JSON:
      body-parser dapat menguraikan body request yang berformat JSON 
      dan membuatnya tersedia dalam objek req.body.
      Contoh: 
        const bodyParser = require('body-parser');
        app.use(bodyParser.json());

        app.post('/data', (req, res) => {
          console.log(req.body); // akan mencetak objek JSON yang dikirim oleh klien
          res.send('Data diterima');
        });

  2. Menguraikan URL-encoded:
      body-parser dapat menguraikan body request yang dikirim dengan
      tipe konten application/x-www-form-urlencoded atau 
      multipart/form-data yang ada di tag form, yang biasanya
      digunakan dalam form HTML.
      Contoh: 
        app.use(bodyParser.urlencoded({ extended: true }));
        app.post('/form', (req, res) => {
          console.log(req.body); // akan mencetak objek yang berisi pasangan key-value dari form
          res.send('Form diterima');
        });

  3. Membatasi Ukuran Body:
      Anda dapat mengatur batasan ukuran body untuk menghindari
      serangan atau permintaan yang terlalu besar.
      Contoh:
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  4. Menguraikan Teks Mentah dan Data Lainnya:
      Meskipun body-parser paling umum digunakan untuk JSON dan 
      URL-encoded, ada juga metode untuk menguraikan teks mentah dan 
      data biner.
      Contoh:
        app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
        app.use(bodyParser.text({ type: 'text/html' }));

# Multer (npm i multer) 
  Multer adalah middleware untuk menghendel multipart/form-data           
  yang digunakan terutama untk meng-upload file. 
*/
