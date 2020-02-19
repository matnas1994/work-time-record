const express = require('express');


const workTimeRecordsController = require('../controllers/workTimeRecords');
const router = express.Router();

router.get('', workTimeRecordsController.getWorkTimeRecords);
router.post('', workTimeRecordsController.createOrUpadateWorkTimeRecords);
router.delete('/:id', workTimeRecordsController.deleteWorkTimeRecord);
module.exports = router;