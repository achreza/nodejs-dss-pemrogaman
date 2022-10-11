var express = require("express");
var app = express();

// SHOW LIST OF bobotS
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM bobot ORDER BY id_bobot DESC", function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        res.render("bobot/list", {
          title: "Bobot List",
          data: "",
        });
      } else {
        // render to views/bobot/list.ejs template file
        res.render("bobot/list", {
          title: "Bobot List",
          data: rows,
        });
      }
    });
  });
});

// SHOW ADD bobot FORM
app.get("/add", function (req, res, next) {
  // render to views/bobot/add.ejs
  res.render("bobot/add", {
    title: "Add New bobot",
    id_kriteria: "",
    value: "",
  });
});

// ADD NEW bobot POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("id_kriteria", "id_kriteria is required").notEmpty(); //Validate id_kriteria
  req.assert("value", "value is required").notEmpty(); //Validate value

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.bobotid_kriteria = '   a bobot    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('bobotid_kriteria').trim(); // returns 'a bobot'
		********************************************/
    var bobot = {
      id_kriteria: req.sanitize("id_kriteria").escape().trim(),
      value: req.sanitize("value").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO bobot SET ?", bobot, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/bobot/add.ejs
          res.render("bobot/add", {
            title: "Add New bobot",
            id_kriteria: bobot.id_kriteria,
            value: bobot.value,
          });
        } else {
          req.flash("success", "Data added successfully!");

          // render to views/bobot/add.ejs
          res.render("bobot/add", {
            title: "Add New bobot",
            id_kriteria: "",
            value: "",
          });
        }
      });
    });
  } else {
    //Display errors to bobot
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.id_kriteria
     * because req.param('id_kriteria') is deprecated
     */
    res.render("bobot/add", {
      title: "Add New bobot",
      id_kriteria: req.body.id_kriteria,
      value: req.body.value,
    });
  }
});

// SHOW EDIT bobot FORM
app.get("/edit/(:id_bobot)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM bobot WHERE id_bobot = ?", [req.params.id_bobot], function (err, rows, fields) {
      if (err) throw err;

      // if bobot not found
      if (rows.length <= 0) {
        req.flash("error", "bobot not found with id_bobot = " + req.params.id_bobot);
        res.redirect("/bobot");
      } else {
        // if bobot found
        // render to views/bobot/edit.ejs template file
        res.render("bobot/edit", {
          title: "Edit bobot",
          //data: rows[0],
          id_bobot: rows[0].id_bobot,
          id_kriteria: rows[0].id_kriteria,
          value: rows[0].value,
        });
      }
    });
  });
});

// EDIT bobot POST ACTION
app.put("/edit/(:id_bobot)", function (req, res, next) {
  req.assert("id_kriteria", "id_kriteria is required").notEmpty(); //Validate id_kriteria
  req.assert("value", "value is required").notEmpty(); //Validate value

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.bobotid_kriteria = '   a bobot    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('bobotid_kriteria').trim(); // returns 'a bobot'
		********************************************/
    var bobot = {
      id_kriteria: req.sanitize("id_kriteria").escape().trim(),
      value: req.sanitize("value").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("UPDATE bobot SET ? WHERE id_bobot = " + req.params.id_bobot, bobot, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/bobot/add.ejs
          res.render("bobot/edit", {
            title: "Edit bobot",
            id_bobot: req.params.id_bobot,
            id_kriteria: req.body.id_kriteria,
            value: req.body.value,
          });
        } else {
          req.flash("success", "Data updated successfully!");

          // render to views/bobot/add.ejs
          res.render("bobot/edit", {
            title: "Edit bobot",
            id_bobot: req.params.id_bobot,
            id_kriteria: req.body.id_kriteria,
            value: req.body.value,
          });
        }
      });
    });
  } else {
    //Display errors to bobot
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.id_kriteria
     * because req.param('id_kriteria') is deprecated
     */
    res.render("bobot/edit", {
      title: "Edit bobot",
      id_bobot: req.params.id_bobot,
      id_kriteria: req.body.id_kriteria,
      value: req.body.value,
    });
  }
});

// DELETE bobot
app.delete("/delete/(:id_bobot)", function (req, res, next) {
  var bobot = { id_bobot: req.params.id_bobot };

  req.getConnection(function (error, conn) {
    conn.query("DELETE FROM bobot WHERE id_bobot = " + req.params.id_bobot, bobot, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash("error", err);
        // redirect to bobot list pvalue
        res.redirect("/bobot");
      } else {
        req.flash("success", "bobot deleted successfully! id_bobot = " + req.params.id_bobot);
        // redirect to bobot list pvalue
        res.redirect("/bobot");
      }
    });
  });
});

module.exports = app;
