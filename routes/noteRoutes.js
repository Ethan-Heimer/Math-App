const express = require('express');
const multer = require("multer");

const router = express.Router();
const upload = multer();

const noteControlls = require("../controllers/noteController.js");

router.get('/', noteControlls.GetAllNotes);

router.get("/create", noteControlls.DisplayNoteCreater)

router.post("/add", upload.none(), noteControlls.AddNote);

module.exports = router;