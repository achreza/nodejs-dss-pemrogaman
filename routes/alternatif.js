var express = require("express");
var app = express();

app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM alternatif ORDER BY idalternatif DESC", function (err, rows, fields) {
      if (err) {
        req.flash("error", err);
        res.render("alternatif/list", {
          title: "Alternatif List",
          data: "",
        });
      } else {
        res.render("alternatif/list", {
          title: "Alternatif List",
          data: rows,
        });
      }
    });
  });
});

// SHOW ADD alternatif FORM
app.get("/add", function (req, res, next) {
  // render to views/alternatif/add.ejs
  res.render("alternatif/add", {
    title: "Add New alternatif",
    nmalternatif: "",
  });
});

// ADD NEW alternatif POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("nmalternatif", "nmalternatif is required").notEmpty(); //Validate nmalternatif

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.alternatifnmalternatif = '   a alternatif    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('alternatifnmalternatif').trim(); // returns 'a alternatif'
		********************************************/
    var alternatif = {
      nmalternatif: req.sanitize("nmalternatif").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO alternatif SET ?", alternatif, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/alternatif/add.ejs
          res.render("alternatif/add", {
            title: "Add New alternatif",
            nmalternatif: alternatif.nmalternatif,
          });
        } else {
          req.flash("success", "Data added successfully!");

          // render to views/alternatif/add.ejs
          res.render("alternatif/add", {
            title: "Add New alternatif",
            nmalternatif: "",
          });
        }
      });
    });
  } else {
    //Display errors to alternatif
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nmalternatif
     * because req.param('nmalternatif') is deprecated
     */
    res.render("alternatif/add", {
      title: "Add New alternatif",
      nmalternatif: req.body.nmalternatif,
    });
  }
});

// SHOW EDIT alternatif FORM
app.get("/edit/(:idalternatif)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM alternatif WHERE idalternatif = ?", [req.params.idalternatif], function (err, rows, fields) {
      if (err) throw err;

      // if alternatif not found
      if (rows.length <= 0) {
        req.flash("error", "alternatif not found with idalternatif = " + req.params.idalternatif);
        res.redirect("/alternatif");
      } else {
        // if alternatif found
        // render to views/alternatif/edit.ejs template file
        res.render("alternatif/edit", {
          title: "Edit alternatif",
          //data: rows[0],
          idalternatif: rows[0].idalternatif,
          nmalternatif: rows[0].nmalternatif,
        });
      }
    });
  });
});

// EDIT alternatif POST ACTION
app.put("/edit/(:idalternatif)", function (req, res, next) {
  req.assert("nmalternatif", "nmalternatif is required").notEmpty(); //Validate nmalternatif

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.alternatifnmalternatif = '   a alternatif    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('alternatifnmalternatif').trim(); // returns 'a alternatif'
		********************************************/
    var alternatif = {
      nmalternatif: req.sanitize("nmalternatif").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("UPDATE alternatif SET ? WHERE idalternatif = " + req.params.idalternatif, alternatif, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/alternatif/add.ejs
          res.render("alternatif/edit", {
            title: "Edit alternatif",
            idalternatif: req.params.idalternatif,
            nmalternatif: req.body.nmalternatif,
          });
        } else {
          req.flash("success", "Data updated successfully!");

          // render to views/alternatif/add.ejs
          res.render("alternatif/edit", {
            title: "Edit alternatif",
            idalternatif: req.params.idalternatif,
            nmalternatif: req.body.nmalternatif,
          });
        }
      });
    });
  } else {
    //Display errors to alternatif
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nmalternatif
     * because req.param('nmalternatif') is deprecated
     */
    res.render("alternatif/edit", {
      title: "Edit alternatif",
      idalternatif: req.params.idalternatif,
      nmalternatif: req.body.nmalternatif,
    });
  }
});

// DELETE alternatif
app.delete("/delete/(:idalternatif)", function (req, res, next) {
  var alternatif = { idalternatif: req.params.idalternatif };

  req.getConnection(function (error, conn) {
    conn.query("DELETE FROM alternatif WHERE idalternatif = " + req.params.idalternatif, alternatif, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        // redirect to alternatif list pjenis
        res.redirect("/alternatif");
      } else {
        req.flash("success", "alternatif deleted successfully! idalternatif = " + req.params.idalternatif);
        // redirect to alternatif list pjenis
        res.redirect("/alternatif");
      }
    });
  });
});

module.exports = app;
