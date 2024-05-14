const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
router.get('/employee/getAll', employeeController.getAllEmployees);
router.post('/employee/create', employeeController.createEmployee);
router.put('/empupdate/:id', employeeController.updateEmployee);
router.delete('/empdelete/:id', employeeController.deleteEmployee);
// GET route to fetch employee details //  enrolled route 
router.get('/employees/details', employeeController.getEmployeeDetails);

module.exports = router;
