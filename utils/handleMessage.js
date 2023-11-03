const { callSendAPI } = require("./callSendAPI");
const { wit } = require("../config/witConfig.js");
const { randomJokes } = require("./randomJokes");
const MessageJson = require("./../config/services.json");

const { responseFromWit } = require("../wit/wit_handler");

const handleMessage = async (senderPsid, receivedMessage) => {
  const { text, attachments } = receivedMessage;

  if (receivedMessage.text) {
    wit
      .message(text)
      .then((receivedMessage) => responseFromWit(receivedMessage))
      .finally((response) => {
        callSendAPI(senderPsid, response);
      });
  } else {
    console.log("received event");
  }

  // Send the response message
  // callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
