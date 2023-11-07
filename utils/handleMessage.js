const { callSendAPI } = require("./callSendAPI");
const MessageJson = require("../config/services.json");

const { witHandler } = require("../wit/witHandler");

const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  if (receivedMessage.text) {
    const aiResponse = await witHandler(senderPsid, receivedMessage.text);

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
    } else {
      response = {
        text: `thank you for messaging us we will be available soon!`,
      };
    }
  } else {
    response = {
      text: "we only respond to the text message for now",
    };
  }

  callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
