const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/webhook", (req, res) => {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook`);
  console.dir(body, { depth: null });
  res.send(`\u{1F7EA} Response from server`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
