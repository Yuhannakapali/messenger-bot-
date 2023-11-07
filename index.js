require("dotenv").config();

const express = require("express");
const { urlencoded, json } = require("body-parser");

const app = express();

// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());

app.use("/", require("./routes/webhookRoutes"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
