const express = require("express");
const routes = express.Router();
const formController = require("../controllers/FormController");
const {
    validateFormInfo
  } = require("../validations/info.validation");

//handle save data
routes.post("/store", validateFormInfo, formController.handleSave);

// Handle send data
routes.post("/send", validateFormInfo, formController.sendToWedhook);

module.exports = routes;