const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");
const MessageJson = require("./../config/services.json")

// function handleMessage(senderPsid, receivedMessage) {
const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
   
    if(MessageJson.hasOwnProperty(receivedMessage.text)){
      console.log("we have this");
    }

    if (receivedMessage.text.includes("hi")) {
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
        text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
      };
    }
  }

  // Send the response message
  callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
