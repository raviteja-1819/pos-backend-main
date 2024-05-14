const bcrypt = require('bcryptjs');
const moment = require('moment');
const User = require('../model/Users');

// Counter to keep track of the user count
let userCounter = 0;

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, designation, email, shiftStartsFrom, shiftEndsFrom, password } = req.body;
    // Parse and format shift start time
    const startTime = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');

    // Parse and format shift end time
    const endTime = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');

    // Generate userId
    const userId = generateUserId();

    const hashedPassword = await bcrypt.hash(password, 10);
    const requestBodyWithoutPassword = { 
      firstName, 
      lastName, 
      mobileNumber, 
      designation, 
      email, 
      shiftStartsFrom: startTime, 
      shiftEndsFrom: endTime
    };

    // Log the request body without the password field
    console.log('Request Body (without password):', requestBodyWithoutPassword);

    // Create new user
    const user = await User.create({ 
      userId, 
      firstName, 
      lastName, 
      mobileNumber, 
      designation, 
      email, 
      shiftStartsFrom: startTime, 
      shiftEndsFrom: endTime, 
      password: hashedPassword 
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateUserId() {
  userCounter++;

  // Convert the counter to 9-character alphanumeric format
  const userId = convertToAlphanumeric(userCounter).padStart(9, '0');

  return userId;
}

function convertToAlphanumeric(numericUserId) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let alphanumericUserId = '';
  while (numericUserId > 0) {
    const remainder = numericUserId % characters.length;
    alphanumericUserId = characters.charAt(remainder) + alphanumericUserId;
    numericUserId = Math.floor(numericUserId / characters.length);
  }

  return alphanumericUserId;
}
