"use strict";

require("dotenv").config();


const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  app = express();

// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());

app.use("/", require("./routes/webhookRoutes"));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
