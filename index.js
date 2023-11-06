require("dotenv").config();

// Imports dependencies and set up http server

const express = require("express");

const app = express();

app.use("/", require("./routes/webhookRoutes"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
