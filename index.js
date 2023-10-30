const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/webhook", (req, res) => {
  let body = req.body;
  console.log(body);
  // send a '200 OK' response if this page is webhook
  //   if (body.object === "page") {
  //     //   returns '200 OK' response to all requests
  //     res.status(200).send("Event Received");
  //   } else {
  //     res.status(404).send("Event Not Found");
  //   }

  //   console.log(`\u{1F7EA} Received webhook`);
  //   console.dir(body, { depth: null });
  //   res.send(` Response from server`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
