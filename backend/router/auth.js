const express = require("express");
const authCtrl = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post("/signin", authCtrl.login);



module.exports = authRouter;

