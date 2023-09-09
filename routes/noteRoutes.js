const express = require('express');
const multer = require("multer");

const noteControlls = require("../controllers/noteController.js");
const noteDisplay = require("../controllers/noteDisplay.js");

const router = express.Router();
const upload = multer();

router.get('/:filters?', noteDisplay.Display)

router.post('/filter', noteDisplay.SetFilters);


module.exports = router;