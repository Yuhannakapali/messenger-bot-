const { randomJokes } = require("../utils/randomJokes");

const responseFromWit = (body) => {
  // console.log("Data from wit");
  console.log(JSON.stringify(body));
  console.log(body.traits);

  const intent = (body.intents.length > 0 && body.intents[0]) || "__foo__";

  switch (intent.name) {
    case "wit_location":
      return location();

    case "wit_get_services":
      return services();

    case "wit_jokes":
      return jokes();
  }
};

const location = () => {
  return Promise.resolve("We are located at anamnagar");
};

const services = () => {
  return Promise.resolve("We are always here for your services");
};

const jokes = () => {
  return Promise.resolve(randomJokes());
};

module.exports = { responseFromWit };
