const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");

// function handleMessage(senderPsid, receivedMessage) {
const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
    if (receivedMessage.text.includes("hi")) {
      response = {
        text: `hello there my friend`,
      };
      console.log("running hi");
    } else if (receivedMessage.text.includes("jokes")) {
      let jokes;
      jokes = await randomJokes();
      response = {
        text: `${jokes}`,
      };
      console.log("running jokes");
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
