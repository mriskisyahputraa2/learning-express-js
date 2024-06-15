import express from "express";
import routes from "../routes/index.js"; // import routes dari routes/index.js
import appMiddleware from "./middleware/index.js";

const app = express();
const port = 3000;

import path from "path"; // Untuk mengelola path file dan direktori
import url from "url"; // Untuk mengelola URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views")); // Mengatur direktori views ke dalam folder views.
app.set("view engine", "ejs"); // Mengatur EJS sebagai template engine.

app.use(appMiddleware); // menggunakan segala macam middleware
app.use(routes); // menggunakan routes middleware nya
// run();
app.listen(port, () => {
  console.log("port is " + port);
});
