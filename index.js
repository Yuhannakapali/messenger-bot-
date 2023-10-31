const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  crypto = require("crypto"),
  path = require("path");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 3001;

app.use(
  urlencoded({
    extended: true,
  })
);

// Parse application/json. Verify that callback came from Facebook
// app.use(json({ verify: verifyRequestSignature }));

// Serving static files in Express
app.use(express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.send("Hello Upesh!");
});

// app.post("/webhook", (req, res) => {
//   let body = req.body;

//   console.log(`\u{1F7EA} Received webhook:`);
//   console.dir(body, { depth: null });
// });

// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // check if a token and mode is in the query string of the request
  if (mode && token) {
    // check if mode and token sent is correct
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      // respond with the challenge token from the request
      console.log("Webhook verified");
      res.status(200).send(challenge);
    } else {
      // respond with '403 forbidden' if verify token do not match
      res.status(403);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
