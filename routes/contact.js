const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact');

router.get('/', contact.index);

router.post('/', contact.sendEmail);

module.exports = router;
