var express = require("express");
var app = express();

// SHOW LIST OF kriteriaS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM kriteria ORDER BY id_kriteria DESC", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("kriteria/list", {
          title: "Kriteria List",
          data: "",
        });
      } else {
        // render to views/kriteria/list.ejs template file
        res.render("kriteria/list", {
          title: "Kriteria List",
          data: rows,
        });
      }
    });
  });
});

// SHOW ADD kriteria FORM
app.get("/add", function (req, res, next) {
  // render to views/kriteria/add.ejs
  res.render("kriteria/add", {
    title: "Add New kriteria",
    nm_kriteria: "",
    jenis: "",
  });
});

// ADD NEW kriteria POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("nm_kriteria", "nm_kriteria is required").notEmpty(); //Validate nm_kriteria
  req.assert("jenis", "jenis is required").notEmpty(); //Validate jenis

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.kriterianm_kriteria = '   a kriteria    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('kriterianm_kriteria').trim(); // returns 'a kriteria'
		********************************************/
    var kriteria = {
      nm_kriteria: req.sanitize("nm_kriteria").escape().trim(),
      jenis: req.sanitize("jenis").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO kriteria SET ?", kriteria, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/kriteria/add.ejs
          res.render("kriteria/add", {
            title: "Add New kriteria",
            nm_kriteria: kriteria.nm_kriteria,
            jenis: kriteria.jenis,
          });
        } else {
          req.flash("success", "Data added successfully!");

          // render to views/kriteria/add.ejs
          res.render("kriteria/add", {
            title: "Add New kriteria",
            nm_kriteria: "",
            jenis: "",
          });
        }
      });
    });
  } else {
    //Display errors to kriteria
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nm_kriteria
     * because req.param('nm_kriteria') is deprecated
     */
    res.render("kriteria/add", {
      title: "Add New kriteria",
      nm_kriteria: req.body.nm_kriteria,
      jenis: req.body.jenis,
    });
  }
});

// SHOW EDIT kriteria FORM
app.get("/edit/(:id_kriteria)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM kriteria WHERE id_kriteria = ?", [req.params.id_kriteria], function (err, rows, fields) {
      if (err) throw err;

      // if kriteria not found
      if (rows.length <= 0) {
        req.flash("error", "kriteria not found with id_kriteria = " + req.params.id_kriteria);
        res.redirect("/kriteria");
      } else {
        // if kriteria found
        // render to views/kriteria/edit.ejs template file
        res.render("kriteria/edit", {
          title: "Edit kriteria",
          //data: rows[0],
          id_kriteria: rows[0].id_kriteria,
          nm_kriteria: rows[0].nm_kriteria,
          jenis: rows[0].jenis,
        });
      }
    });
  });
});

// EDIT kriteria POST ACTION
app.put("/edit/(:id_kriteria)", function (req, res, next) {
  req.assert("nm_kriteria", "nm_kriteria is required").notEmpty(); //Validate nm_kriteria
  req.assert("jenis", "jenis is required").notEmpty(); //Validate jenis

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.kriterianm_kriteria = '   a kriteria    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('kriterianm_kriteria').trim(); // returns 'a kriteria'
		********************************************/
    var kriteria = {
      nm_kriteria: req.sanitize("nm_kriteria").escape().trim(),
      jenis: req.sanitize("jenis").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("UPDATE kriteria SET ? WHERE id_kriteria = " + req.params.id_kriteria, kriteria, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/kriteria/add.ejs
          res.render("kriteria/edit", {
            title: "Edit kriteria",
            id_kriteria: req.params.id_kriteria,
            nm_kriteria: req.body.nm_kriteria,
            jenis: req.body.jenis,
          });
        } else {
          req.flash("success", "Data updated successfully!");

          // render to views/kriteria/add.ejs
          res.render("kriteria/edit", {
            title: "Edit kriteria",
            id_kriteria: req.params.id_kriteria,
            nm_kriteria: req.body.nm_kriteria,
            jenis: req.body.jenis,
          });
        }
      });
    });
  } else {
    //Display errors to kriteria
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nm_kriteria
     * because req.param('nm_kriteria') is deprecated
     */
    res.render("kriteria/edit", {
      title: "Edit kriteria",
      id_kriteria: req.params.id_kriteria,
      nm_kriteria: req.body.nm_kriteria,
      jenis: req.body.jenis,
    });
  }
});

// DELETE kriteria
app.delete("/delete/(:id_kriteria)", function (req, res, next) {
  var kriteria = { id_kriteria: req.params.id_kriteria };

  req.getConnection(function (error, conn) {
    conn.query("DELETE FROM kriteria WHERE id_kriteria = " + req.params.id_kriteria, kriteria, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        // redirect to kriteria list pjenis
        res.redirect("/kriteria");
      } else {
        req.flash("success", "kriteria deleted successfully! id_kriteria = " + req.params.id_kriteria);
        // redirect to kriteria list pjenis
        res.redirect("/kriteria");
      }
    });
  });
});

module.exports = app;
