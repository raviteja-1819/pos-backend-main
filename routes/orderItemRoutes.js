// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderItemController');

router.post('/orders', orderController.placeOrder);

module.exports = router;
