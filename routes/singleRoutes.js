const express = require('express');
const router = express.Router()
const singleController = require('../controllers/singleController')


router.get('/:pictureId', singleController.single_index_get)


router.get('/:pictureId/delete',singleController.single_delete)

router.post('/:pictureId/edit',singleController.single_edit_post)


module.exports = router