const { body } = require("express-validator");

const validateFormInfo = [
  body('type').notEmpty().withMessage('Type does not empty'),
  body('friendlyName').notEmpty().withMessage('friendlyName is requied field'),
  body('webhookURL').isURL().withMessage('webhookURL is invalid'),
  body("botName").optional().isString()
]

module.exports = {
  validateFormInfo
};