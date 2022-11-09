var express = require("express");
var app = express();

// SHOW LIST OF topsis_nilaivS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_nilaiv", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_nilaiv/list", {
          title: "topsis_nilaiv List",
          data: "",
        });
      } else {
        // render to views/topsis_nilaiv/list.ejs template file
        res.render("topsis_nilaiv/list", {
          title: "topsis_nilaiv List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
