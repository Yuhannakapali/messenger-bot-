const request = require("request");

const callSendAPI = (senderPsid, response) => {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || undefined;

  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error(`Unable to send message: ${err}`);
      }
    },
  );
};

module.exports = { callSendAPI };
