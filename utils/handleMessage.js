const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");
const MessageJson = require("./../config/services.json");
const { witHandler } = require("../wit/witHandler");

const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  if (receivedMessage.text) {
    let aiResponse = await witHandler(senderPsid, receivedMessage.text);
    if (aiResponse) {
      return;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (MessageJson.hasOwnProperty(receivedMessage.text)) {
      response = {
        text: `${MessageJson[receivedMessage.text]}`,
      };
    } else if (receivedMessage.text.includes("hi")) {
      response = {
        text: `Hello, we are always available for your  help`,
      };
    } else if (receivedMessage.text.includes("joke")) {
      let jokes;
      jokes = await randomJokes();
      response = {
        text: `${jokes}`,
      };
    } else {
      response = {
        text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
      };
    }
  }

  callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
