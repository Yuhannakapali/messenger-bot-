const express = require("express");
const router = express.Router();

const {
  homepage,
  getwebhook,
  // postwebhook,
  witWebhook,
} = require("../controllers/webHookController");

router.get("/", homepage);
router.get("/webhook", getwebhook);
// router.post("/webhook", postwebhook);
router.post("/webhook", witWebhook);

module.exports = router;
