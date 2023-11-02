// const { witWebhook } = require("../controllers/webHookController");

const responseFromWit = (senderPsid, body) => {
  console.log("Data from wit");
  console.log(JSON.stringify(body));

  const intent = (body.intents.lenght > 0 && body.intents[0]) || "__foo__";

  switch (intent.name) {
    case "wit_location":
      return witWebhookResponse(senderPsid, body);
    case "services":
      return witWebhookResponse(senderPsid, body);
  }
};

const witWebhookResponse = () => {
  return Promise.resolve(`this is the  response from us`);
};

module.exports = { responseFromWit };
