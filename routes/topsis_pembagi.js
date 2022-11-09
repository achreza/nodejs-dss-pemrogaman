var express = require("express");
var app = express();

// SHOW LIST OF topsis_pembagiS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_pembagi", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_pembagi/list", {
          title: "topsis_pembagi List",
          data: "",
        });
      } else {
        // render to views/topsis_pembagi/list.ejs template file
        res.render("topsis_pembagi/list", {
          title: "topsis_pembagi List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
