const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/employeeController');

// Admin routes
router.get('/employees', verifyToken, isAdmin, employeeController.getAllEmployees);
router.post('/employees', verifyToken, isAdmin, employeeController.createEmployee);
router.put('/employees/:id', verifyToken, isAdmin, employeeController.updateEmployee);
router.delete('/employees/:id', verifyToken, isAdmin, employeeController.deleteEmployee);

// Employee route to update own data
router.put('/employees/update', verifyToken, employeeController.updateOwnData);

// Enrolled employees route
router.get('/employee-details', verifyToken, isAdmin, employeeController.getEmployeeDetails);

module.exports = router;
