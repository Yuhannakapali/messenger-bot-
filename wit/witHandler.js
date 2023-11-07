const { wit } = require("../config/wit");
const { callSendAPI } = require("../utils/callSendAPI");
const intentJson = require("../config/intents.json");
const {randomJokes} = require("../utils/randomJokes");
 

const witHandler = async (senderId, message) => {
  let response = false;
  if (message.length >= 280) { 
    return response
  }

  let witResponse = await wit.message(message);

  witResponse.intents.forEach((intent) => {
    // eslint-disable-next-line no-prototype-builtins
    if (intentJson.hasOwnProperty(intent.name)) {
      let reply = intentJson[intent.name];
      if (intent.name === "wit_jokes") {
        try {
          randomJokes().then(joke => (callSendAPI(senderId, {text: `${joke}`})))
        }
        catch (err) {
          console.log(err)
        }
      }
      callSendAPI(senderId, { text: `${reply}` });
      response = true;
    }
  });
  return response;
};

module.exports = { witHandler };
