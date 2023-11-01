const callSendAPI = require("./callSendAPI");

const handlePostback = (senderPsid, receivedPostback) => {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
};

module.exports = { handlePostback };
