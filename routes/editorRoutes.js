const express = require('express');
const multer = require("multer");

const router = express.Router();
const noteCreator = require("../controllers/noteCreator");
const noteControlls = require("../controllers/noteController.js");
const upload = multer();

router.get("/:id?", noteCreator.Display);

router.post("/edit/:id", upload.none(), noteControlls.EditNote)

router.post("/add", upload.none(), noteControlls.AddNote);

router.get('/delete/:id', noteControlls.DeleteNote);

module.exports = router;