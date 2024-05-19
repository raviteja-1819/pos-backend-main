// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.post('/add', orderItemController.addItemToOrder);
router.put('/update',orderItemController.updateItemInOrder);
router.delete('/delete',orderItemController.removeItemFromOrder);

module.exports = router;
