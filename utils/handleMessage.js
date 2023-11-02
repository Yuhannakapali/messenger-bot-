const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");
const MessageJson = require("./../config/services.json");

// function handleMessage(senderPsid, receivedMessage) {
const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
    // eslint-disable-next-line no-prototype-builtins
    if (MessageJson.hasOwnProperty(receivedMessage.text)) {
      response = {
        text: `${MessageJson[receivedMessage.text]}`,
      };
    } else if (receivedMessage.text.includes("hi")) {
      response = {
        text: `Hello, we are always available for your services`,
      };
    } else if (receivedMessage.text.includes("jokes")) {
      let jokes;
      jokes = await randomJokes();
      response = {
        text: `${jokes}`,
      };
    } else {
      response = {
        text: `Thank you for messaging us!, our members will be at your service soon!`,
      };
    }
  } else {
    response = {
      text: `We only response to the text messages right now`,
    };
  }

  // Send the response message
  callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
