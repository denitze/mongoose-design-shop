const express = require('express');
const router = express.Router()
const addController = require('../controllers/addController')


router.get('/', addController.add_get)

router.post('/', addController.add_post)


module.exports = router