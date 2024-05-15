import express from "express"; // import express
const app = express();
const port = 3000;

import router from "./routes/index.js"; // import router

import expressEjsLayouts from "express-ejs-layouts"; // import expressEjsLayouts
import path from "path"; // import path
import url from "url"; // import url
const __dirname = url.fileURLToPath(new URL(".", import.meta.url)); // deklarasi __dirname

// meng-set path dari views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressEjsLayouts);
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
