const express = require("express");
const router = express.Router();

const {
  homepage,
  getwebhook,
  postwebhook,
} = require("../controllers/webHookController");

router.get("/", homepage);
router.get("/webhook", getwebhook);
router.post("/webhook", postwebhook);

module.exports = router;
