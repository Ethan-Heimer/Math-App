const express = require('express');
const multer = require("multer");

const router = express.Router();
const upload = multer();

const noteControlls = require("../controllers/noteController.js");

router.get('/', noteControlls.GetAllNotes);

router.get("/create:id", noteControlls.DisplayNoteCreater)

router.post("/add", upload.none(), noteControlls.AddNote);

router.post("/edit:id", upload.none(), noteControlls.EditNote)

router.get('/delete:id', noteControlls.DeleteNote);

module.exports = router;