var express = require("express");
var app = express();

// SHOW LIST OF wp_nilaivS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM wp_nilaiv", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("wp_nilaiv/list", {
          title: "wp_nilaiv List",
          data: "",
        });
      } else {
        // render to views/wp_nilaiv/list.ejs template file
        res.render("wp_nilaiv/list", {
          title: "wp_nilaiv List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
