var express = require("express");
var app = express();

// SHOW LIST OF vrangkingS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM vrangking", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("vrangking/list", {
          title: "vrangking List",
          data: "",
        });
      } else {
        // render to views/vrangking/list.ejs template file
        res.render("vrangking/list", {
          title: "vrangking List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
