let { handleMessage } = require("../utils/handleMessage"),
  { handlePostback } = require("../utils/handlePostback");

// Respond with 'Hello World' when a GET request is made to the homepage
const homepage =
  ("/",
  function (_req, res) {
    res.send("Hello World");
  });

//get request to our webhook

const getwebhook = (req, res) => {
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

// Creates the endpoint for your webhook

const postwebhook = (req, res) => {
  let body = req.body;

  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    // returns a '200 OK' response to all requests
    // res.status(200).send("Event Received");

    // Iterates over each entry - there may be multiple if batched
    // body.entry.forEach(function (entry) {
    body.entry.forEach((entry) => {
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id;
      console.log("Sender PSID: " + senderPsid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

module.exports = {
  homepage,
  getwebhook,
  postwebhook,
};
