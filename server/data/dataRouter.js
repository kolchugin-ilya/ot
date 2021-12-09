const express = require('express');
const router = express.Router();
const dataController = require('./dataController')

router.post('/create', dataController.createData)
router.post('/read', dataController.readData)
router.post('/readEmployers', dataController.readEmployers)
router.post('/readEmployersById', dataController.readEmployersById)
router.post('/update', dataController.updateData)
router.post('/delete', dataController.deleteData)

module.exports = router
