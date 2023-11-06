const callSendAPI = require("./callSendAPI");

const handlePostback = (senderPsid, receivedPostback) => {
  let response;

  let payload = receivedPostback.payload;

  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }

  callSendAPI(senderPsid, response);
};

module.exports = { handlePostback };
