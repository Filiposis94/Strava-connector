const express = require('express');
const router = express.Router();

const {getAuthUrl, exchangeToken} = require('../controllers/auth')

router.route('/start').get(getAuthUrl)
router.route('/token').post(exchangeToken)

module.exports = router