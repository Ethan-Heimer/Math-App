const express = require('express');
const router = express.Router();

const noteControlls = require("../controllers/noteController.js");

router.get('/', noteControlls.GetAllNotes);

module.exports = router;