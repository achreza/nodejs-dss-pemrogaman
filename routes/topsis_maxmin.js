var express = require("express");
var app = express();

// SHOW LIST OF topsis_maxminS
//SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topsis_maxmin;", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("topsis_maxmin/list", {
          title: "topsis_maxmin List",
          data: "",
        });
      } else {
        // render to views/topsis_maxmin/list.ejs template file
        res.render("topsis_maxmin/list", {
          title: "topsis_maxmin List",
          data: rows,
        });
      }
    });
  });
});

module.exports = app;
