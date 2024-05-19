// controllers/itemController.js
const Item = require('../model/Item');
const { Op } = require('sequelize');
const multer = require('multer');

// Configure multer to handle file uploads
const upload = multer();

const inventoryController = {
  // Create a new item
  async createItem(req, res) {
    try {
      const { name, description, price, category, availability } = req.body;
console.log(req.body);
      // Check if file upload succeeded
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image.' });
      }

      // Read the image file and convert it to base64
      const base64Photo = req.file.buffer.toString('base64');
      const item = await Item.create({
        name,
        description,
        price,
        category,
        availability,
        photo: base64Photo
      });

      return res.status(201).json(item);
    } catch (error) {
      console.error('Error creating item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
      // Get all items
  async getAllItems(req, res) {
    try {
      const items = await Item.findAll();
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get an item by ID
  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      return res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

   // Get items by category
   async getItemsByCategory(req, res) {
    try {
      const { category } = req.params;
      const items = await Item.findAll({ where: { category } });
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items by category:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Search for items by name
  async searchItemsByName(req, res) {
    try {
      const { name } = req.query;
      const items = await Item.findAll({ where: { name: { [Op.like]: `%${name}%` } } });
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error searching items by name:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update an item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category, availability } = req.body;

      // Validate mandatory fields
      if (!name || !price || !category) {
        return res.status(400).json({ error: 'Please fill all mandatory fields.' });
      }

      const item = await Item.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }

      // Update item details
      item.name = name;
      item.description = description;
      item.price = price;
      item.category = category;
      item.availability = availability;

      await item.save();

      return res.status(200).json(item);
    } catch (error) {
      console.error('Error updating item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete an item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      await item.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = inventoryController;
