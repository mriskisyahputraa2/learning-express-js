import exprees from "express";
import bodyParser from "body-parser";
import session from "express-session"; // import session

const app = exprees();
const port = 3000;

app.use(bodyParser.json()); // mendefinisikan body parser(menguraikan) untuk data JSON
app.use(bodyParser.urlencoded({ extended: true })); // mendefinisikan urlencoded data URL-encoded yang dikirim untuk permintaan HTTP dan extended true, untuk penguraikan data yang lebih kompleks

app.get("/login", (req, res) => {
  console.log(req.body);
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
*/
