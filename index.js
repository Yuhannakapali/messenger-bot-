"use strict";

require("dotenv").config();

// Imports dependencies and set up http server

const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  app = express();

// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());

// Webserver parameter
const PORT = process.env.PORT || 3001;

app.use("/", require("./Routes/webhookRoutes"));

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
