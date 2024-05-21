const Employee = require('../model/Users');
const Role = require('../model/Role');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');  // Import the UUID library
const moment = require('moment');

// Get all employees with their roles
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: Role });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Create a new employee 
exports.createEmployee = async (req, res) => {
  try {
    const { shiftStartsFrom, shiftEndsFrom, password, ...rest } = req.body;
    // Generate a unique user ID
    const userId = uuidv4();
    // Format shift timings using Moment.js
    const formattedShiftStart = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');
    const formattedShiftEnd = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the employee
    const employee = await Employee.create({
      userId,
      shiftStartsFrom: formattedShiftStart,
      shiftEndsFrom: formattedShiftEnd,
      password: hashedPassword,
      ...rest
    });

    res.status(201).json({
      message: 'Employee created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { shiftStartsFrom, shiftEndsFrom, roleId, password, ...rest } = req.body;
    const updateData = { ...rest };

    if (shiftStartsFrom) {
      updateData.shiftStartsFrom = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');
    }
    if (shiftEndsFrom) {
      updateData.shiftEndsFrom = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (roleId) {
      updateData.roleId = roleId;
    }

    const [updated] = await Employee.update(updateData, { where: { id } });

    if (updated) {
      const updatedEmployee = await Employee.findByPk(id, { include: Role });
      return res.status(200).json(updatedEmployee);
    }
    throw new Error('Employee not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Employee not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee details (specific attributes)
exports.getEmployeeDetails = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['firstName', 'lastName', 'shiftStartsFrom', 'shiftEndsFrom'],
      include: { model: Role, attributes: ['name'] }
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update own data
exports.updateOwnData = async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName, mobileNumber, shiftStartsFrom, shiftEndsFrom, photo } = req.body;
    const updateData = {
      firstName,
      lastName,
      mobileNumber,
      photo
    };

    if (shiftStartsFrom) {
      updateData.shiftStartsFrom = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');
    }
    if (shiftEndsFrom) {
      updateData.shiftEndsFrom = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');
    }

    await Employee.update(updateData, { where: { userId } });
    res.json({ message: 'Employee data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
