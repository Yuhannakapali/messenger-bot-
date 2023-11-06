const { wit } = require("../config/wit");
const { callSendAPI } = require("../utils/callSendAPI");
const intentJson = require("../config/intents.json");
const {randomJokes} = require("../utils/randomJokes");
 
const witHandler = async (senderId, message) => {
  let response = false;
  let witResponse = await wit.message(message);

  let jokes = await randomJokes();


  witResponse.intents.forEach((intent) => {
    // eslint-disable-next-line no-prototype-builtins
    if (intentJson.hasOwnProperty(intent.name)) {

      let reply = intentJson[intent.name];
    
      if (intent.name === "wit_jokes") {
        try {
          callSendAPI(senderId, {text: `${jokes}`})
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
