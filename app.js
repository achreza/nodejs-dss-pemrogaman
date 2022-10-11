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

app.listen(3000, function () {
  console.log("Server running at port 3000: http://127.0.0.1:3000");
});
