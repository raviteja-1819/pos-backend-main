// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/inventoryController');

// Route to create a new item
router.post('/items', itemController.createItem);

// Route to get all items
router.get('/items', itemController.getAllItems);

// Route to get items by category
router.get('/items/category/:category', itemController.getItemsByCategory);

// Route to search for items by name
router.get('/items/search', itemController.searchItemsByName);

// Route to get a single item by ID
router.get('/items/:id', itemController.getItemById);

// Route to update an item by ID
router.put('/items/:id', itemController.updateItem);

// Route to delete an item by ID
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
