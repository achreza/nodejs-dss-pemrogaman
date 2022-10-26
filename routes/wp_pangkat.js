var express = require("express");
var app = express();

// SHOW LIST OF wp_pangkatS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM wp_pangkat", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("wp_pangkat/list", {
          title: "wp_pangkat List",
          data: "",
        });
      } else {
        // render to views/wp_pangkat/list.ejs template file
        res.render("wp_pangkat/list", {
          title: "wp_pangkat List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
