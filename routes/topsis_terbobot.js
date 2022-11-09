var express = require("express");
var app = express();

// SHOW LIST OF topsis_terbobotS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_terbobot", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_terbobot/list", {
          title: "topsis_terbobot List",
          data: "",
        });
      } else {
        // render to views/topsis_terbobot/list.ejs template file
        res.render("topsis_terbobot/list", {
          title: "topsis_terbobot List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
