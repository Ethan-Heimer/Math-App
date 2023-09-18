const express = require('express');
const flashCardController = require("../controllers/flashCardsController.js");

const router = express.Router();

router.get('/:id', flashCardController.display);

module.exports = router;