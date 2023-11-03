const { Wit, log } = require("node-wit");

const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.INFO),
});

module.exports = { wit };
