// routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/items', inventoryController.addItem);
router.put('/items/:itemId', inventoryController.editItem);
router.delete('/items/:itemId', inventoryController.deleteItem);
router.get('/items', inventoryController.getAllItems);
router.get('/items/category/:category', inventoryController.getItemsByCategory);
router.get('/items/search', inventoryController.searchItems);
module.exports = router;
