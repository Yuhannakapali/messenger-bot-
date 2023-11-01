const { callSendAPI } = require("./callSendAPI");
const { randomJokes } = require("./randomJokes");
const fs = require("fs");

// function handleMessage(senderPsid, receivedMessage) {
const handleMessage = async (senderPsid, receivedMessage) => {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
    let userMessage = fs.readFileSync(
      `${__dirname}/../config/services.json`,
      "utf8"
    );

    // if (!userMessage[receivedMessage.text] === undefined) {
    //   console.log("test message received");
    // }
    if (
      Object.prototype.hasOwnProperty.call(userMessage, receivedMessage.text)
    ) {
      console.log("jfdkj");
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
