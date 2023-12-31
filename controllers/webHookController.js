const { handleMessage } = require("../utils/handleMessage");

const homepage =
  ("/",
  function (_req, res) {
    res.send("Hello World");
  });

// get request to our webhook

const getwebhook = (req, res) => {
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || undefined;

  // Parse the query params
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

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
  const { body } = req;
  console.log("request", req);
  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched

    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      const senderPsid = webhookEvent.sender.id;
      console.log(`Sender PSID: ${senderPsid}`);

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  homepage,
  getwebhook,
  postwebhook,
};
