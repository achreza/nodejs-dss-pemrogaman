var express = require("express");
var app = express();

// SHOW LIST OF multimoora_2S
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM multimoora_2", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("multimoora_2/list", {
          title: "multimoora_2 List",
          data: "",
        });
      } else {
        // render to views/multimoora_2/list.ejs template file
        res.render("multimoora_2/list", {
          title: "multimoora_2 List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
