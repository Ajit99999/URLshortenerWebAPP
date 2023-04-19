const express = require("express");
const Router = express.Router();
const { createNewURL,getNewURL } = require('../controller/url');
Router.post('/create',createNewURL);
Router.get('/get/:shortURLId',getNewURL);
module.exports = Router;