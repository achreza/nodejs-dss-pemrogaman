var express = require("express");
var app = express();

// SHOW LIST OF wp_nilaisS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM wp_nilais", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("wp_nilais/list", {
          title: "wp_nilais List",
          data: "",
        });
      } else {
        // render to views/wp_nilais/list.ejs template file
        res.render("wp_nilais/list", {
          title: "wp_nilais List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
