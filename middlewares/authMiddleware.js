const jwt = require('jsonwebtoken');
const User = require('../model/Users');
const jwt_secret = 'e0aef50129d2695d4b4707c1cd1e0666eeb2993c38e66037d60d7b229ef2ad9310141863f8c9b914f9378fe44f656a4ae78578c4d343b576c94ac034698a9852';

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  try {
    const verified = jwt.verify(token, jwt_secret);
    console.log('Verified Token:', verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(400).json({ error: 'Token is not valid' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userId: req.user.userId } });
    if (user && user.roleId === 5) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied, not an admin!' });
    }
  } catch (error) {
    console.error('isAdmin Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { verifyToken, isAdmin };
