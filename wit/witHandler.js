const { wit } = require("../config/wit");
const { callSendAPI } = require("../utils/callSendAPI");
const intentJson = require("../config/intents.json");

const witHandler = async (senderId, message) => {
  let response = false;
  let witResponse = await wit.message(message);

  witResponse.intents.forEach((intent) => {
    // eslint-disable-next-line no-prototype-builtins
    if (intentJson.hasOwnProperty(intent.name)) {
      const reply = intentJson[intent.name];
      callSendAPI(senderId, { text: `${reply}` });
      response = true;
    }
  });
  return response;
};

module.exports = { witHandler };
