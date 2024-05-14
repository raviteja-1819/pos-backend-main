// controllers/signupController.js

const bcrypt = require('bcryptjs');
const moment = require('moment'); // Import moment.js for time parsing and formatting
const  User  = require('../model/User');

exports.signup = async (req, res) => {
  try {
    const { userId, firstName, lastName, mobileNumber, designation, email, shiftStartsFrom, shiftEndsFrom } = req.body;

    // Parse and format shift start time
    const startTime = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');

    // Parse and format shift end time
    const endTime = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Create new user
    const user = await User.create({ 
      userId, 
      firstName, 
      lastName, 
      mobileNumber, 
      designation, 
      email, 
      shiftStartsFrom: startTime, // Use the correctly formatted start time
      shiftEndsFrom: endTime, // Use the correctly formatted end time
      password: hashedPassword 
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
