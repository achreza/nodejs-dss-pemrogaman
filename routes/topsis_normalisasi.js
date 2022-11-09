var express = require("express");
var app = express();

// SHOW LIST OF topsis_normalisasiS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_normalisasi", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_normalisasi/list", {
          title: "topsis_normalisasi List",
          data: "",
        });
      } else {
        // render to views/topsis_normalisasi/list.ejs template file
        res.render("topsis_normalisasi/list", {
          title: "topsis_normalisasi List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
