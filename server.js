// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tables = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/:reservations?", function(req, res) {
    var chosen = req.params.reservations;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < tables.length; i++) {
            if (chosen === tables[i].routeName) {
                res.json(tables[i]);
                return;
            }
        }

        console.log(tables);

        res.json(tables);
    } else {
        res.json(false);
    }
});

app.post("/api/new", function(req, res) {
  var newRes = req.body;
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);

  tables.push(newRes);
  
  res.json(newRes);
});

app.post("/api/deleteTable", function(req, res) {

	for (var i = 1; i < tables.length; i++) {

		if (this.id === tables[i].id) {

			tables.splice(i, 1);

		}

	}

});

app.post("/api/deleteWaitlist", function(req, res) {

	for (var i = 1; i < waitlist.length; i++) {

		if (this.id === waitlist[i].id) {

			waitlist.splice(i, 1);

		}

	}

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

