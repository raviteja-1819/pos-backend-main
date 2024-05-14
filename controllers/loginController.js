// controllers/loginController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../model/User'); // Assuming you have a User model

exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    // Find the user in the database
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
