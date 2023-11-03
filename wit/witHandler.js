const { wit } = require("../config/wit")
const { callSendAPI } = require("../utils/callSendAPI")
const intentJson = require("../config/intents.json")

const witHandler = async (senderId, message) => {
  let response = await wit.message(message)
  console.log("🚀 ~ file: witHandler.js:7 ~ witHandler ~ response:", response)

  response.intents.forEach((intent) => {

    // eslint-disable-next-line no-prototype-builtins
    if (intentJson.hasOwnProperty(intent.name)) {
      const reply = intentJson[intent.name]
      callSendAPI(senderId, { text: `Message from witAi: ${reply}` })
    }
  })
}

module.exports = { witHandler }