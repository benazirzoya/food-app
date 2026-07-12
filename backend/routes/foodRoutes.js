const router = require('express').Router();
const { getFoods, addFood } = require('../controllers/foodController');

router.get('/', getFoods);
router.post('/', addFood);

module.exports = router;