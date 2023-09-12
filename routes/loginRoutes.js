const express = require('express');

const loginController = require('../controllers/loginController.js');

const router = express.Router();

router.get("/login", loginController.displayLogin(null, 200))

router.get("/create", loginController.displayCreator(null, 200));

router.post("/login/attempt", loginController.login);

router.post("/add", loginController.addUser);

module.exports = router;