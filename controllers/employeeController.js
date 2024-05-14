const Employee = require('../model/Employee');
const moment = require('moment');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { shiftStartsFrom, shiftEndsFrom, ...rest } = req.body;
    const formattedShiftStart = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');
    const formattedShiftEnd = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');
    const employee = await Employee.create({ ...rest, shiftStartsFrom: formattedShiftStart, shiftEndsFrom: formattedShiftEnd });
    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { shiftStartsFrom, shiftEndsFrom, ...rest } = req.body;
    const formattedShiftStart = moment(shiftStartsFrom, 'h:mm A').format('HH:mm:ss');
    const formattedShiftEnd = moment(shiftEndsFrom, 'h:mm A').format('HH:mm:ss');
    const [updated] = await Employee.update({ ...rest, shiftStartsFrom: formattedShiftStart, shiftEndsFrom: formattedShiftEnd }, { where: { userId: id } });
    if (updated) {
      const updatedEmployee = await Employee.findOne({ where: { userId: id } });
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
    const deleted = await Employee.destroy({ where: { userId: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Employee not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee details including name, designation, login and logout time
exports.getEmployeeDetails = async (req, res) => {
    try {
      const employees = await Employee.findAll({
        attributes: ['firstName', 'designation', 'shiftStartsFrom', 'shiftEndsFrom']
      });
      res.json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };