const express = require('express');
const multer = require("multer");

const noteControlls = require("../controllers/noteController.js");
const noteDisplay = require("../controllers/noteDisplay.js");
const noteCreator = require("../controllers/noteCreator");

const router = express.Router();
const upload = multer();

router.get('/', noteDisplay.DisplayAllNotes());

router.get("/create:id", noteCreator.DisplayFromURLId)

router.post("/add", upload.none(), noteControlls.AddNote);

router.post("/edit:id", upload.none(), noteControlls.EditNote)

router.get('/delete:id', noteControlls.DeleteNote);

router.post('/filter', upload.none(), noteDisplay.DisplayFiltersInBody())

router.get("/:ids?&:filters?", noteDisplay.RenderDisplay);

module.exports = router;