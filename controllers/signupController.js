const bcrypt = require('bcryptjs');
const moment = require('moment');
const User = require('../model/Users');
const { v4: uuidv4 } = require('uuid');  // Import the UUID librar
// Counter to keep track of the user count
let userCounter = 0;

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, shiftStartsFrom, shiftEndsFrom, password, roleId } = req.body;

    // Check if the email or mobile number already exist in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingMobile = await User.findOne({ where: { mobileNumber } });
    if (existingMobile) {
      return res.status(400).json({ error: 'Mobile number already exists' });
    }

    // Parse and format shift start time
    const startTime = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');

    // Parse and format shift end time
    const endTime = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');

    // Generate userId
    const userId = uuidv4();  // Generate a unique userId

    const hashedPassword = await bcrypt.hash(password, 10);
    const requestBodyWithoutPassword = { 
      firstName, 
      lastName, 
      mobileNumber,  
      email, 
      shiftStartsFrom: startTime, 
      shiftEndsFrom: endTime,
      roleId
    };

    // Log the request body without the password field
    console.log('Request Body (without password):', requestBodyWithoutPassword);

    // Create new user
    const user = await User.create({ 
      userId, 
      firstName, 
      lastName, 
      mobileNumber, 
      email, 
      shiftStartsFrom: startTime, 
      shiftEndsFrom: endTime, 
      password: hashedPassword,
      roleId
    });

    res.status(201).json({userId,firstName,lastName,mobileNumber,email,shiftStartsFrom,shiftEndsFrom,roleId});
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
