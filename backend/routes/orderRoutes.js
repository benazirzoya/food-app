const router = require('express').Router();
const { placeOrder, getOrders, cancelOrder } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', getOrders);
router.delete('/:id', cancelOrder);

module.exports = router;