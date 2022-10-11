var express = require("express");
var app = express();

// SHOW LIST OF vmatrixkeputusanS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM vmatrixkeputusan", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("vmatrixkeputusan/list", {
          title: "vmatrixkeputusan List",
          data: "",
        });
      } else {
        // render to views/vmatrixkeputusan/list.ejs template file
        res.render("vmatrixkeputusan/list", {
          title: "vmatrixkeputusan List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
