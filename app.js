var express = require("express");
var app = express();

var mysql = require("mysql");

var myConnection = require("express-myconnection");

var config = require("./config");
var dbOptions = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db,
};

app.use(myConnection(mysql, dbOptions, "pool"));

app.set("view engine", "ejs");

var index = require("./routes/index");
var kriteria = require("./routes/kriteria");
var alternatif = require("./routes/alternatif");
var bobot = require("./routes/bobot");
var skala = require("./routes/skala");
var matrix = require("./routes/matrix");
var vmatrix = require("./routes/vmatrix");
var vnormalisasi = require("./routes/vnormalisasi");
var vrangking = require("./routes/vrangking");
var wp_nilais = require("./routes/wp_nilais");
var wp_nilaiv = require("./routes/wp_nilaiv");
var wp_normalisasiterbobot = require("./routes/wp_normalisasiterbobot");
var wp_pangkat = require("./routes/wp_pangkat");
var topsis_maxmin = require("./routes/topsis_maxmin");
var topsis_normalisasi = require("./routes/topsis_normalisasi");
var topsis_nilaiv = require("./routes/topsis_nilaiv");
var topsis_pembagi = require("./routes/topsis_pembagi");
var topsis_sipsin = require("./routes/topsis_sipsin");
var topsis_terbobot = require("./routes/topsis_terbobot");
var multimoora_1 = require("./routes/multimoora_1");
var multimoora_2 = require("./routes/multimoora_2");
var multimoora_3 = require("./routes/multimoora_3");
var multimoora_4 = require("./routes/multimoora_4");

var expressValidator = require("express-validator");
app.use(expressValidator());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var methodOverride = require("method-override");

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

var flash = require("express-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParser("keyboard cat"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.use("/", index);
app.use("/kriteria", kriteria);
app.use("/alternatif", alternatif);
app.use("/bobot", bobot);
app.use("/skala", skala);
app.use("/matrix", matrix);
app.use("/vmatrix", vmatrix);
app.use("/vnormalisasi", vnormalisasi);
app.use("/vrangking", vrangking);
app.use("/wp_nilais", wp_nilais);
app.use("/wp_nilaiv", wp_nilaiv);
app.use("/wp_normalisasiterbobot", wp_normalisasiterbobot);
app.use("/wp_pangkat", wp_pangkat);
app.use("/topsis_maxmin", topsis_maxmin);
app.use("/topsis_normalisasi", topsis_normalisasi);
app.use("/topsis_nilaiv", topsis_nilaiv);
app.use("/topsis_pembagi", topsis_pembagi);
app.use("/topsis_sipsin", topsis_sipsin);
app.use("/topsis_terbobot", topsis_terbobot);
app.use("/multimoora_1", multimoora_1);
app.use("/multimoora_2", multimoora_2);
app.use("/multimoora_3", multimoora_3);
app.use("/multimoora_4", multimoora_4);

app.listen(3000, function () {
  console.log("Server running at port 3000: http://127.0.0.1:3000");
});
