var express = require("express");
var app = express();

// SHOW LIST OF topsis_sipsinS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_sipsin", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_sipsin/list", {
          title: "topsis_sipsin List",
          data: "",
        });
      } else {
        // render to views/topsis_sipsin/list.ejs template file
        res.render("topsis_sipsin/list", {
          title: "topsis_sipsin List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
