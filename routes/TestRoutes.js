const express = require('express');
const router = express.Router();

const TestControlls = require("../controllers/testcontrolls.js");

router.get('/', TestControlls.GetAllUsers);

module.exports = router;