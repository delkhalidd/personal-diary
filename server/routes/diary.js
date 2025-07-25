// routers/goats.js
const { Router } = require('express');
const router = Router();
const diaryController = require('../controllers/diary')

router.get('/', diaryController.index)
router.get('/:id', diaryController.show)
router.post('/', diaryController.create)
router.patch('/:id', diaryController.update)
router.delete('/:id', diaryController.destroy)

module.exports = router;