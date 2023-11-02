let { handleMessage } = require("../utils/handleMessage");
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
  console.log(body);
  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched

    body.entry.forEach((entry) => {
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      let senderPsid = webhookEvent.sender.id;
      console.log("Sender PSID: " + senderPsid);

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const { responseFromWit } = require("../wit/wit_handler");
const { callSendAPI } = require("../utils/callSendAPI");

const { Wit, log } = require("node-wit");

const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.INFO),
});

const witWebhook = (req) => {
  let body = req.body;
  // console.log(body);
  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && !event.message.is_echo) {
          const senderPsid = event.sender.id;

          // We retrieve the message content
          const { text, attachments } = event.message;

          if (attachments) {
            // We received an attachment
            // Let's reply with an automatic message
            callSendAPI(
              senderPsid,
              "Sorry I can only process text messages for now."
            ).catch(console.error);
          } else if (text) {
            wit
              .message(text)
              .then((res) => responseFromWit(senderPsid, res))
              .then((msg) => {
                callSendAPI(senderPsid, msg);
              })
              .catch((err) => {
                console.error(
                  "Oops! Got an error from Wit: ",
                  err.stack || err
                );
              });
          }
        } else {
          console.log("received event", JSON.stringify(event));
        }
      });
    });
  }
};

module.exports = {
  homepage,
  getwebhook,
  postwebhook,
  witWebhook,
};
