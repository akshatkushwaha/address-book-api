const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authcontroller");

router.post("/auth/login", login);
router.post("/auth/register", register);

module.exports = router;
