import exprees from "express";
import bodyParser from "body-parser";

const app = exprees();
const port = 3000;

app.use(bodyParser.json()); // mendefinisikan body parser(menguraikan) untuk data JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.send("login berhasil");
});

app.listen(port, () => {
  console.log("port is running in localhost " + port);
});
