const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");
const MessageJson = require("./../config/services.json");

const { responseFromWit } = require("../wit/wit_handler");
const { Wit, log } = require("node-wit");

const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.INFO),
});

const handleMessage = async (senderPsid, receivedMessage) => {
  const { text, attachments } = receivedMessage;

  if (receivedMessage.text) {
    wit
      .message(text)
      .then((res) => responseFromWit(res))
      .then((msg) => callSendAPI(senderPsid, msg));
  } else {
    console.log("received event", JSON.stringify(event));
  }

  // Send the response message
  callSendAPI(senderPsid, text);
};

module.exports = { handleMessage };
