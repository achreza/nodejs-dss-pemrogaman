var express = require("express");
var app = express();

// SHOW LIST OF wp_normalisasiterbobotS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM wp_normalisasiterbobot", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("wp_normalisasiterbobot/list", {
          title: "wp_normalisasiterbobot List",
          data: "",
        });
      } else {
        // render to views/wp_normalisasiterbobot/list.ejs template file
        res.render("wp_normalisasiterbobot/list", {
          title: "wp_normalisasiterbobot List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
