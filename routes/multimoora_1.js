var express = require("express");
var app = express();

// SHOW LIST OF multimoora_1S
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM multimoora_1", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("multimoora_1/list", {
          title: "multimoora_1 List",
          data: "",
        });
      } else {
        // render to views/multimoora_1/list.ejs template file
        res.render("multimoora_1/list", {
          title: "multimoora_1 List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
