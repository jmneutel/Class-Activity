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
var waitlist = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
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

        for (var i = 0; i < waitlist.length; i++) {
            if (chosen === waitlist[i].routeName) {
                res.json(waitlist[i]);
                return;
            }
        }


        res.json(false);
    } else {
        res.json(tables);
        res.json(waitlist);
    }
});

app.post("/api/new", function(req, res) {
  var newRes = req.body;
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);

  if(tables.length <= 5) {

  	tables.push(newRes);

  } else {

  	if(waitlist.length <= 5) {

  		waitlist.push(newRes);

  	} else {

  		console.log("Sorry, we are booked up completely");
  	}

  }
  
  res.json(newRes);
});

app.post("/api/deleteTable", function(req, res) {

	for (var = 1; i < tables.length; i++) {

		if (this.id === tables[i].id) {

			tables.splice(i, 1);

		}

	}

});

app.post("/api/deleteWaitlist", function(req, res) {

	for (var = 1; i < waitlist.length; i++) {

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

