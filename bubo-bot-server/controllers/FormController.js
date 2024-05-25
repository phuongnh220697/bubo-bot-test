const { storeURL } = require('../config')
const { getCurrentDateTime } = require('../common')
var { validationResult } = require('express-validator');

class FormController {
  //POST save
  async handleSave(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const body = req.body
      const dataStore = {
        type: body.type,
        friendlyName: body.friendlyName,
        webhookURL: body.webhookURL,
        botName: body.botName || ''
      };

      const response = await fetch(`${storeURL}${getCurrentDateTime()}.json`, {
        method: 'POST',
        body: JSON.stringify(dataStore)
      });

      await response.json();

      if (!response.ok) {
        res.status(403).send({errors: 'Store Failed'})
      }

      res.status(200).send({message: 'Store Done'})
    } catch (e) {
      console.log(e)
      res.status(403).send({error: 'Store Failed'})
    }
  }

  async sendToWedhook (req, res, next) { 
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const body = req.body
      const data = {
        'content': `Hi ${body.friendlyName}`
      } 
      if(body.botName) {
        data.username = body.botName.replace(/ /g, '_')
      }

      const response = await fetch(body.webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      

      const status = await response.status;
      console.log(status)

      if (status === 204) {
        res.status(200).send({message: 'Send Done'})
      } else {
        res.status(403).send({error: 'Send Failed'})
      }

      
    } catch (e) {
      console.log(e)
      res.status(403).send({error: 'Send Failed'})
    }
  }

}
module.exports = new FormController();
