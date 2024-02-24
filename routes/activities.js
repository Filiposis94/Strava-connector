const express = require('express');
const router = express.Router();
const getActivities = require('../controllers/activities')
const refreshTokenMiddleware = require('../middleware/refresh-token')

router.route('/:id').get(refreshTokenMiddleware,getActivities)

module.exports = router
