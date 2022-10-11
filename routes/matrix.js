var express = require("express");
var app = express();

// SHOW LIST OF matrixS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM matrixkeputusan ORDER BY id_matrix DESC", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("matrix/list", {
          title: "Matrix List",
          data: "",
        });
      } else {
        // render to views/matrix/list.ejs template file
        res.render("matrix/list", {
          title: "Matrix List",
          data: rows,
        });
      }
    });
  });
});

// SHOW ADD matrix FORM
app.get("/add", function (req, res, next) {
  // render to views/matrix/add.ejs
  res.render("matrix/add", {
    title: "Add New matrix",
    id_alternatif: "",
    id_bobot: "",
    id_skala: "",
  });
});

// ADD NEW matrix POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("id_alternatif", "id_alternatif is required").notEmpty(); //Validate id_alternatif
  req.assert("id_bobot", "id_bobot is required").notEmpty(); //Validate id_bobot
  req.assert("id_skala", "id_skala is required").notEmpty(); //Validate id_bobot

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.matrixid_alternatif = '   a matrix    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('matrixid_alternatif').trim(); // returns 'a matrix'
		********************************************/
    var matrix = {
      id_alternatif: req.sanitize("id_alternatif").escape().trim(),
      id_bobot: req.sanitize("id_bobot").escape().trim(),
      id_skala: req.sanitize("id_skala").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO matrixkeputusan SET ?", matrix, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/matrix/add.ejs
          res.render("matrix/add", {
            title: "Add New matrix",
            id_alternatif: matrix.id_alternatif,
            id_bobot: matrix.id_bobot,
            id_skala: matrix.id_skala,
          });
        } else {
          req.flash("success", "Data added successfully!");

          // render to views/matrix/add.ejs
          res.render("matrix/add", {
            title: "Add New matrix",
            id_alternatif: "",
            id_bobot: "",
            id_skala: "",
          });
        }
      });
    });
  } else {
    //Display errors to matrix
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.id_alternatif
     * because req.param('id_alternatif') is deprecated
     */
    res.render("matrix/add", {
      title: "Add New matrix",
      id_alternatif: req.body.id_alternatif,
      id_bobot: req.body.id_bobot,
      id_skala: req.body.id_skala,
    });
  }
});

// SHOW EDIT matrix FORM
app.get("/edit/(:id_matrix)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM matrixkeputusan WHERE id_matrix = ?", [req.params.id_matrix], function (err, rows, fields) {
      if (err) throw err;

      // if matrix not found
      if (rows.length <= 0) {
        req.flash("error", "matrix not found with id_matrix = " + req.params.id_matrix);
        res.redirect("/matrix");
      } else {
        // if matrix found
        // render to views/matrix/edit.ejs template file
        res.render("matrix/edit", {
          title: "Edit matrix",
          //data: rows[0],
          id_matrix: rows[0].id_matrix,
          id_alternatif: rows[0].id_alternatif,
          id_bobot: rows[0].id_bobot,
          id_skala: rows[0].id_skala,
        });
      }
    });
  });
});

// EDIT matrix POST ACTION
app.put("/edit/(:id_matrix)", function (req, res, next) {
  req.assert("id_alternatif", "id_alternatif is required").notEmpty(); //Validate id_alternatif
  req.assert("id_bobot", "id_bobot is required").notEmpty(); //Validate id_bobot
  req.assert("id_skala", "id_skala is required").notEmpty(); //Validate id_bobot

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.matrixid_alternatif = '   a matrix    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('matrixid_alternatif').trim(); // returns 'a matrix'
		********************************************/
    var matrix = {
      id_alternatif: req.sanitize("id_alternatif").escape().trim(),
      id_bobot: req.sanitize("id_bobot").escape().trim(),
      id_skala: req.sanitize("id_skala").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("UPDATE matrixkeputusan SET ? WHERE id_matrix = " + req.params.id_matrix, matrix, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/matrix/add.ejs
          res.render("matrix/edit", {
            title: "Edit matrix",
            id_matrix: req.params.id_matrix,
            id_alternatif: req.body.id_alternatif,
            id_bobot: req.body.id_bobot,
            id_skala: req.body.id_skala,
          });
        } else {
          req.flash("success", "Data updated successfully!");

          // render to views/matrix/add.ejs
          res.render("matrix/edit", {
            title: "Edit matrix",
            id_matrix: req.params.id_matrix,
            id_alternatif: req.body.id_alternatif,
            id_bobot: req.body.id_bobot,
            id_skala: req.body.id_skala,
          });
        }
      });
    });
  } else {
    //Display errors to matrix
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.id_alternatif
     * because req.param('id_alternatif') is deprecated
     */
    res.render("matrix/edit", {
      title: "Edit matrix",
      id_matrix: req.params.id_matrix,
      id_alternatif: req.body.id_alternatif,
      id_bobot: req.body.id_bobot,
      id_skala: req.body.id_skala,
    });
  }
});

// DELETE matrix
app.delete("/delete/(:id_matrix)", function (req, res, next) {
  var matrix = { id_matrix: req.params.id_matrix };

  req.getConnection(function (error, conn) {
    conn.query("DELETE FROM matrixkeputusan WHERE id_matrix = " + req.params.id_matrix, matrix, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        // redirect to matrix list pid_bobot
        res.redirect("/matrix");
      } else {
        req.flash("success", "matrix deleted successfully! id_matrix = " + req.params.id_matrix);
        // redirect to matrix list pid_bobot
        res.redirect("/matrix");
      }
    });
  });
});

module.exports = app;
