var express = require("express");
var app = express();

// SHOW LIST OF vnormalisasiS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM vnormalisasi", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("vnormalisasi/list", {
          title: "vnormalisasi List",
          data: "",
        });
      } else {
        // render to views/vnormalisasi/list.ejs template file
        res.render("vnormalisasi/list", {
          title: "vnormalisasi List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
