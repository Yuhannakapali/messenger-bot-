const { callSendAPI } = require("./callSendAPI");

// function handleMessage(senderPsid, receivedMessage) {
const handleMessage = (senderPsid, receivedMessage) => {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
    if (receivedMessage.text.includes("hi")) {
      response = {
        text: `hello there my friend`,
      };
    } else {
      response = {
        text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
      };
    }
  } else if (receivedMessage.attachments) {
    // Get the URL of the message attachment
    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachmentUrl,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(senderPsid, response);
};

module.exports = { handleMessage };
