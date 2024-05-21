// Import necessary models
const Order = require('../model/Order');
const OrderItem = require('../model/OrderItem');

// Function to add an item to an order
exports.addItemToOrder = async (req, res) => {
  try {
    const { order_id, product_id, quantity, item_price } = req.body;
    const orderItem = await OrderItem.create({
      order_id: order_id,
      product_id: product_id,
      quantity: quantity,
      item_price: item_price
    });

    res.status(201).json({ message: 'Item added to order successfully', orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update an item in an order
exports.updateItemInOrder = async (req, res) => {
  try {
    const { order_item_id, quantity } = req.body;

    // Find the order item by ID
    const orderItem = await OrderItem.findByPk(order_item_id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    // Update the quantity of the order item
    orderItem.quantity = quantity;
    await orderItem.save();

    res.status(200).json({ message: 'Order item updated successfully', orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to remove an item from an order
exports.removeItemFromOrder = async (req, res) => {
  try {
    const { order_item_id } = req.params;
    const orderItem = await OrderItem.findByPk(order_item_id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    await orderItem.destroy();

    res.status(200).json({ message: 'Order item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
