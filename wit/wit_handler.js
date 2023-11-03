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
  }
};

const location = () => {
  console.log("this is the location");
};

const services = () => {
  console.log(`we provide you with differet services`);
};

module.exports = { responseFromWit };
