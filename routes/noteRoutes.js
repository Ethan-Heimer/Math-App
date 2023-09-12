const express = require('express');
const noteDisplay = require("../controllers/noteDisplay.js");

const router = express.Router();

router.get('/:userId/:filters?', noteDisplay.Display)

router.post('/filter/:userId', noteDisplay.SetFilters);


module.exports = router;