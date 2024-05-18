const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/Users');
const jwt_secret = process.env.SECRET_KEY
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    let user;
    // Check if the identifier is an email
    if (identifier.includes('@')) {
      user = await User.findOne({ where: { email: identifier } });
    } else {
      // Otherwise, treat it as a mobile number
      user = await User.findOne({ where: { mobileNumber: identifier } });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
   
    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, jwt_secret, { expiresIn: '1h' });
    // Create a new object with user details excluding password and shift timings
    const userDetails = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
      email: user.email,
      roleId: user.roleId,
    };
    res.json({ token, user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
