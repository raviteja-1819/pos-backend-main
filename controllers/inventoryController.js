// controllers/inventoryController.js

const Item = require('../model/Item');
const { Op } = require('sequelize');
exports.searchItems = async (req, res) => {
  const { query } = req.query;
  try {
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } }, // Search by item name (case-insensitive)
          { category: { [Op.like]: `%${query}%` } } // Search by category (case-insensitive)
        ]
      }
    });
    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to add a new item to the inventory
exports.addItem = async (req, res) => {
  try {
    // Extract item details from request body
    const { name, mrp, discount, category, description } = req.body;

    // Create new item in the inventory
    const newItem = await Item.create({
      name,
      mrp,
      discount,
      category,
      description
    });

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to edit an existing item in the inventory
exports.editItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const updatedItem = await Item.findByPk(itemId);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update item details
    const { name, mrp, price, discount, category, description } = req.body;
    updatedItem.name = name;
    updatedItem.mrp = mrp;
   
    updatedItem.discount = discount;
    updatedItem.category = category;
    updatedItem.description = description;

    // Save the changes to the database
    await updatedItem.save();

    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete an item from the inventory
exports.deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const deletedItem = await Item.findByPk(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete the item from the database
    await deletedItem.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to display all items in the inventory
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getItemsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const items = await Item.findAll({
      where: {
        category: category
      }
    });
    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};