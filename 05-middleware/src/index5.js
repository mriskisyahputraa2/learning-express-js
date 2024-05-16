/*
// penggunaan Third-party middleware(Middleware pihak ketiga)
untuk penggunaan error pada middleware


harus ada npm yang diinstall dulu, yaitu:
1. npm install cookie-parser: untuk menguraikan pengeloan cookie yang dikirimkan oleh klien dalam permintaan HTTP
2. npm install helmet: untuk meningkatkan keamanan aplikasi 

*/

import express from "express";

const app = express();
const port = 3000;

import cookieParser from "cookie-parser"; // import cookieParser
app.use(cookieParser());

import helmet from "helmet"; // import helmet
app.use(helmet());

app.listen(port, () => {
  console.log("running port: " + port);
});
