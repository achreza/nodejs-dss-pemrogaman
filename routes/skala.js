var express = require("express");
var app = express();

// SHOW LIST OF skalaS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM skala ORDER BY id_skala DESC", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("Kkala/list", {
          title: "Skala List",
          data: "",
        });
      } else {
        // render to views/skala/list.ejs template file
        res.render("skala/list", {
          title: "Skala List",
          data: rows,
        });
      }
    });
  });
});

// SHOW ADD skala FORM
app.get("/add", function (req, res, next) {
  // render to views/skala/add.ejs
  res.render("skala/add", {
    title: "Add New skala",
    nm_skala: "",
    value: "",
  });
});

// ADD NEW skala POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("nm_skala", "nm_skala is required").notEmpty(); //Validate nm_skala
  req.assert("value", "value is required").notEmpty(); //Validate value

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.skalanm_skala = '   a skala    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('skalanm_skala').trim(); // returns 'a skala'
		********************************************/
    var skala = {
      nm_skala: req.sanitize("nm_skala").escape().trim(),
      value: req.sanitize("value").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO skala SET ?", skala, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/skala/add.ejs
          res.render("skala/add", {
            title: "Add New skala",
            nm_skala: skala.nm_skala,
            value: skala.value,
          });
        } else {
          req.flash("success", "Data added successfully!");

          // render to views/skala/add.ejs
          res.render("skala/add", {
            title: "Add New skala",
            nm_skala: "",
            value: "",
          });
        }
      });
    });
  } else {
    //Display errors to skala
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nm_skala
     * because req.param('nm_skala') is deprecated
     */
    res.render("skala/add", {
      title: "Add New skala",
      nm_skala: req.body.nm_skala,
      value: req.body.value,
    });
  }
});

// SHOW EDIT skala FORM
app.get("/edit/(:id_skala)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM skala WHERE id_skala = ?", [req.params.id_skala], function (err, rows, fields) {
      if (err) throw err;

      // if skala not found
      if (rows.length <= 0) {
        req.flash("error", "skala not found with id_skala = " + req.params.id_skala);
        res.redirect("/skala");
      } else {
        // if skala found
        // render to views/skala/edit.ejs template file
        res.render("skala/edit", {
          title: "Edit skala",
          //data: rows[0],
          id_skala: rows[0].id_skala,
          nm_skala: rows[0].nm_skala,
          value: rows[0].value,
        });
      }
    });
  });
});

// EDIT skala POST ACTION
app.put("/edit/(:id_skala)", function (req, res, next) {
  req.assert("nm_skala", "nm_skala is required").notEmpty(); //Validate nm_skala
  req.assert("value", "value is required").notEmpty(); //Validate value

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.skalanm_skala = '   a skala    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('skalanm_skala').trim(); // returns 'a skala'
		********************************************/
    var skala = {
      nm_skala: req.sanitize("nm_skala").escape().trim(),
      value: req.sanitize("value").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("UPDATE skala SET ? WHERE id_skala = " + req.params.id_skala, skala, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/skala/add.ejs
          res.render("skala/edit", {
            title: "Edit skala",
            id_skala: req.params.id_skala,
            nm_skala: req.body.nm_skala,
            value: req.body.value,
          });
        } else {
          req.flash("success", "Data updated successfully!");

          // render to views/skala/add.ejs
          res.render("skala/edit", {
            title: "Edit skala",
            id_skala: req.params.id_skala,
            nm_skala: req.body.nm_skala,
            value: req.body.value,
          });
        }
      });
    });
  } else {
    //Display errors to skala
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.nm_skala
     * because req.param('nm_skala') is deprecated
     */
    res.render("skala/edit", {
      title: "Edit skala",
      id_skala: req.params.id_skala,
      nm_skala: req.body.nm_skala,
      value: req.body.value,
    });
  }
});

// DELETE skala
app.delete("/delete/(:id_skala)", function (req, res, next) {
  var skala = { id_skala: req.params.id_skala };

  req.getConnection(function (error, conn) {
    conn.query("DELETE FROM skala WHERE id_skala = " + req.params.id_skala, skala, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        // redirect to skala list pvalue
        res.redirect("/skala");
      } else {
        req.flash("success", "skala deleted successfully! id_skala = " + req.params.id_skala);
        // redirect to skala list pvalue
        res.redirect("/skala");
      }
    });
  });
});

module.exports = app;
