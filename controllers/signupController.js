const bcrypt = require('bcryptjs');
const moment = require('moment');
const { Op } = require('sequelize');
const User = require('../model/Users');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');  
const upload = multer();


let userCounter = 0;

function generateUserId() {
  userCounter++;

  // Check if the counter reaches maximum numeric value (all nines)
  if (userCounter === Number.MAX_SAFE_INTEGER) {
    // Reset the counter to start from 0
    userCounter = 0;
  }

  // Convert the counter to alphanumeric format
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
exports.signup = async (req, res) => {
  try {
    const { id, firstName, lastName, mobileNumber, designation, email, shiftStartsFrom, shiftEndsFrom, password } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image.' });
    }
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
    const userId = generateUserId();  // Using the custom function to generate userId

    const hashedPassword = await bcrypt.hash(password, 10);
    const requestBodyWithoutPassword = {
      firstName,
      lastName,
      designation,
      mobileNumber,
      email,
      shiftStartsFrom: startTime,
      shiftEndsFrom: endTime
    };

    // Log the request body without the password field
    console.log('Request Body (without password):', requestBodyWithoutPassword);

    // Create new user
    const base64Photo = req.file.buffer.toString('base64');
    const user = await User.create({
      id,
      userId,
      firstName,
      lastName,
      designation,
      mobileNumber,
      email,
      shiftStartsFrom: startTime,
      shiftEndsFrom: endTime,
      password: hashedPassword,
      photo: base64Photo
    });

    res.status(201).json({ userId, firstName, lastName, mobileNumber, email, shiftStartsFrom, shiftEndsFrom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
